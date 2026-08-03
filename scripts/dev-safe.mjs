import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { open, readFile, rename, stat, unlink, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const require = createRequire(import.meta.url);
const projectRoot = resolve(process.cwd());
const host = "127.0.0.1";
const port = Number(process.env.AXION_DEV_PORT || 3002);
const healthUrls = ["/", "/about", "/projects/all"].map((path) => `http://${host}:${port}${path}`);
const cachePath = join(projectRoot, ".next-dev");
const lockPath = join(projectRoot, ".axion-dev-server.lock");
const nextBin = require.resolve("next/dist/bin/next");
const recoverableError = /Cannot find module ['"].*vendor-chunks|MODULE_NOT_FOUND.*\.next-dev|ENOENT.*\.next-dev|webpack-runtime\.js/i;
const pageError = /Runtime Error|Internal Server Error|Application error|Cannot find module/i;
const maxRecoveries = 2;

let child;
let lockHandle;
let recoveryCount = 0;
let recovering = false;
let stopping = false;
let healthTimer;
let consecutiveHealthFailures = 0;
let healthIndex = 0;

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function isProcessRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function moveAside(path, category) {
  if (!(await exists(path))) return null;
  const destination = join(tmpdir(), "axion-dev-recovery", category, `${Date.now()}-${process.pid}`);
  await mkdir(dirname(destination), { recursive: true });
  await rename(path, destination);
  return destination;
}

async function acquireLock() {
  try {
    lockHandle = await open(lockPath, "wx");
    await lockHandle.writeFile(JSON.stringify({ pid: process.pid, port, startedAt: new Date().toISOString() }));
    return;
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }

  let owner;
  try {
    owner = JSON.parse(await readFile(lockPath, "utf8"));
  } catch {
    owner = null;
  }

  if (owner && isProcessRunning(owner.pid)) {
    console.log(`AXION dev server is already managed by PID ${owner.pid} on http://${host}:${port}`);
    process.exit(0);
  }

  const staleLock = await moveAside(lockPath, "stale-locks");
  if (staleLock) console.warn(`Moved stale dev lock to ${staleLock}`);
  await acquireLock();
}

async function releaseLock() {
  try {
    await lockHandle?.close();
  } catch {}
  try {
    const owner = JSON.parse(await readFile(lockPath, "utf8"));
    if (owner.pid === process.pid) await unlink(lockPath);
  } catch {}
}

async function stopChild() {
  if (!child || child.exitCode !== null) return;
  const current = child;
  await new Promise((resolveExit) => {
    const timeout = setTimeout(() => {
      if (current.exitCode === null) current.kill("SIGKILL");
    }, 5_000);
    current.once("exit", () => {
      clearTimeout(timeout);
      resolveExit();
    });
    current.kill("SIGTERM");
  });
}

async function recover(reason) {
  if (recovering || stopping) return;
  recovering = true;
  recoveryCount += 1;

  if (recoveryCount > maxRecoveries) {
    console.error(`Automatic dev recovery stopped after ${maxRecoveries} attempts. Last reason: ${reason}`);
    await shutdown(1);
    return;
  }

  console.warn(`\nDetected recoverable Next.js dev error: ${reason}`);
  await stopChild();
  const backup = await moveAside(cachePath, "next-dev-cache");
  if (backup) console.warn(`Moved unhealthy .next-dev cache to ${backup}`);
  consecutiveHealthFailures = 0;
  recovering = false;
  startChild();
}

function forwardOutput(stream, target) {
  stream.on("data", (chunk) => {
    const message = chunk.toString();
    target.write(chunk);
    if (recoverableError.test(message)) void recover(message.trim().split("\n")[0]);
  });
}

function startChild() {
  if (stopping) return;
  child = spawn(process.execPath, [nextBin, "dev", "-H", host, "-p", String(port)], {
    cwd: projectRoot,
    env: { ...process.env, NEXT_DIST_DIR: ".next-dev" },
    stdio: ["inherit", "pipe", "pipe"],
  });

  forwardOutput(child.stdout, process.stdout);
  forwardOutput(child.stderr, process.stderr);

  child.once("exit", (code, signal) => {
    if (stopping || recovering) return;
    console.error(`Next.js dev server exited unexpectedly (${signal || code || 0}).`);
    void shutdown(code || 1);
  });
}

async function checkHealth() {
  if (stopping || recovering || !child || child.exitCode !== null) return;
  const healthUrl = healthUrls[healthIndex % healthUrls.length];
  healthIndex += 1;
  try {
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(7_000), cache: "no-store" });
    const body = await response.text();
    const unhealthy = response.status >= 500 || pageError.test(body);
    consecutiveHealthFailures = unhealthy ? consecutiveHealthFailures + 1 : 0;
    if (recoverableError.test(body) || consecutiveHealthFailures >= 2) {
      await recover(`health check returned ${response.status}`);
    }
  } catch (error) {
    consecutiveHealthFailures += 1;
    if (consecutiveHealthFailures >= 4) await recover(`health check failed: ${error.message}`);
  }
}

async function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  clearInterval(healthTimer);
  await stopChild();
  await releaseLock();
  process.exit(exitCode);
}

await acquireLock();
console.log(`AXION safe dev supervisor: http://${host}:${port}`);
startChild();
healthTimer = setInterval(() => void checkHealth(), 10_000);
healthTimer.unref();

process.on("SIGINT", () => void shutdown(0));
process.on("SIGTERM", () => void shutdown(0));
process.on("SIGUSR2", () => void recover("manual recovery signal"));
process.on("uncaughtException", (error) => {
  console.error(error);
  void shutdown(1);
});
process.on("unhandledRejection", (error) => {
  console.error(error);
  void shutdown(1);
});
