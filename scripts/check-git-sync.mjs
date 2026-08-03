import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const failures = [];
const branch = git("branch", "--show-current");
const head = git("rev-parse", "HEAD");
const status = git("status", "--porcelain");
let upstream = "";
let upstreamHead = "";

try {
  upstream = git("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}");
  upstreamHead = git("rev-parse", "@{upstream}");
} catch {
  failures.push("current branch has no upstream");
}

if (!branch) failures.push("detached HEAD is not publishable");
if (status) failures.push("working tree is not clean");
if (upstreamHead && head !== upstreamHead) failures.push(`local HEAD ${head.slice(0, 7)} differs from ${upstream} ${upstreamHead.slice(0, 7)}`);

if (failures.length) {
  console.error(`Git sync check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Git sync check passed: ${branch} ${head.slice(0, 7)} = ${upstream}`);
