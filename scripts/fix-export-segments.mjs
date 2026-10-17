// Runs after `next build` (npm "postbuild").
//
// Next.js 16 static export names its client-navigation data files by turning "/" into "."
// (e.g. `projects/__next.projects.__PAGE__.txt`), but on Windows the paths it reads use "\",
// so it writes `projects/__next.projects/__PAGE__.txt` instead and in-site navigation 404s.
// This flattens any such folders back into the dotted file names. On Linux/macOS there is
// nothing to fix and it does nothing.
import { readdir, rename, rmdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** All files under `dir`, as absolute-ish paths. */
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)])),
  );
  return nested.flat();
}

/** Remove `dir` and any now-empty folders inside it. */
async function removeEmptyDirs(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) await removeEmptyDirs(join(dir, entry.name));
  }
  if ((await readdir(dir)).length === 0) await rmdir(dir);
}

let moved = 0;

async function fixDir(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      // e.g. out/projects/__next.projects/__PAGE__.txt -> out/projects/__next.projects.__PAGE__.txt
      for (const file of await filesIn(child)) {
        const dotted = relative(dir, file).split(sep).join(".");
        await rename(file, join(dir, dotted));
        moved++;
      }
      await removeEmptyDirs(child);
    } else {
      await fixDir(child);
    }
  }
}

if (await exists(OUT)) {
  await fixDir(OUT);
  console.log(moved ? `fix-export-segments: renamed ${moved} page data file(s).` : "fix-export-segments: nothing to fix.");
}
