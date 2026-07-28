import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const sourceRoots = ["src", "public", "dist/client"];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
]);
const rawAssetExtensions = new Set([
  ".csv",
  ".parquet",
  ".xls",
  ".xlsx",
  ".feather",
  ".sqlite",
  ".db",
]);

const findings = new Map([
  ["raw/spreadsheet assets", new Set()],
  ["calendar-style scenario dates", new Set()],
  ["non-synthetic operational identifiers", new Set()],
  ["unsupported connectivity claims", new Set()],
  ["private path references", new Set()],
  ["uploads, camera, analytics, or telemetry", new Set()],
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function add(category, path) {
  findings.get(category).add(relative(root, path));
}

for (const directory of sourceRoots) {
  const absolute = join(root, directory);
  for (const path of await walk(absolute)) {
    const extension = extname(path).toLowerCase();
    if (rawAssetExtensions.has(extension)) add("raw/spreadsheet assets", path);
    if (!textExtensions.has(extension)) continue;

    const content = await readFile(path, "utf8");
    const claimSafe = content
      .replaceAll("No live field connection", "")
      .replaceAll("no live field connection", "");

    if (/\b(?:19|20)\d{2}[-/]\d{1,2}[-/]\d{1,2}\b/.test(content)) {
      add("calendar-style scenario dates", path);
    }
    if (/(?<!SYN-)\b(?:WI|WELL|EV|INSP|ACT)-\d+\b/i.test(content)) {
      add("non-synthetic operational identifiers", path);
    }
    if (/\b(?:live data|real-time(?: monitoring| data)?|production AI|currently deployed)\b/i.test(claimSafe)) {
      add("unsupported connectivity claims", path);
    }
    if (/\/Users\/|[A-Z]:\\Users\\|LifeProjects|oil-injection-system/i.test(content)) {
      add("private path references", path);
    }
    if (
      directory !== "dist/client" &&
      /type\s*=\s*["']file["']|getUserMedia|trackingPixel|analytics\.|telemetry\./i.test(content)
    ) {
      add("uploads, camera, analytics, or telemetry", path);
    }
  }
}

const failed = [...findings.entries()].filter(([, paths]) => paths.size > 0);
if (failed.length) {
  console.error("Safety scan failed.");
  for (const [category, paths] of failed) {
    console.error(`- ${category}: ${[...paths].join(", ")}`);
  }
  process.exit(1);
}

console.log("Safety scan passed: 6 categories checked; no findings.");
