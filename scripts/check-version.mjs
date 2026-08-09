import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const packageLock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const changelog = await readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const version = packageJson.version;

const failures = [];
if (packageLock.version !== version) failures.push(`package-lock.json version is ${packageLock.version}`);
if (packageLock.packages?.[""]?.version !== version) failures.push(`package-lock root package version is ${packageLock.packages?.[""]?.version}`);
if (!readme.includes(`현재 버전: \`v${version}`)) failures.push("README current version is not synchronized");
if (!readme.includes(`version-v${version}-`)) failures.push("README version badge is not synchronized");
if (!changelog.includes(`## [${version}]`)) failures.push("CHANGELOG has no matching version section");

if (failures.length) {
  console.error(`Version check failed for v${version}:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Version check passed: v${version}`);
