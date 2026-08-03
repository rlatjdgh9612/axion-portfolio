import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const lockPath = resolve(process.cwd(), ".axion-dev-server.lock");

try {
  const owner = JSON.parse(await readFile(lockPath, "utf8"));
  if (!Number.isInteger(owner.pid) || owner.pid <= 0) throw new Error("invalid supervisor PID");
  process.kill(owner.pid, "SIGUSR2");
  console.log(`Requested safe dev recovery from PID ${owner.pid}`);
} catch (error) {
  console.error(`Unable to request dev recovery: ${error.message}`);
  process.exit(1);
}
