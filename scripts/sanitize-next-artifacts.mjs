import { createHash } from "node:crypto";
import { readdir, readFile, rename, stat, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";

const roots = [".next/types", ".next-dev/types", ".next-build/types", ".next-qa/types"];
const backupRoot = join(tmpdir(), "axion-next-artifact-duplicates", `${Date.now()}-${process.pid}`);
let moved = 0;

const digest = async (path) => createHash("sha256").update(await readFile(path)).digest("hex");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(root, directory = root) {
  if (!(await exists(directory))) return;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(root, path);
      continue;
    }

    const match = entry.name.match(/^(.*) \d+(\.[^.]+)$/);
    if (!match) continue;
    const canonical = join(directory, `${match[1]}${match[2]}`);
    if (!(await exists(canonical)) || await digest(path) !== await digest(canonical)) continue;

    const destination = join(backupRoot, root.replaceAll("/", "-"), relative(root, path));
    await mkdir(dirname(destination), { recursive: true });
    await rename(path, destination);
    moved += 1;
  }
}

for (const root of roots) await walk(root);

console.log(moved
  ? `Moved ${moved} duplicate Next.js artifact(s) to ${backupRoot}`
  : "No duplicate Next.js artifacts found");
