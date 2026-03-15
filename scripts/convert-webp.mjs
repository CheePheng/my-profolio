import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const FRAMES_DIR = join(import.meta.dirname, "..", "public", "frames");
const QUALITY = 85;

const files = (await readdir(FRAMES_DIR)).filter((f) => f.endsWith(".png")).sort();
console.log(`Converting ${files.length} PNGs → WebP (quality ${QUALITY})…`);

let done = 0;
for (const file of files) {
  const src = join(FRAMES_DIR, file);
  const dst = join(FRAMES_DIR, file.replace(".png", ".webp"));
  await sharp(src).webp({ quality: QUALITY }).toFile(dst);
  done++;
  if (done % 20 === 0 || done === files.length) {
    console.log(`  ${done}/${files.length}`);
  }
}

console.log("Done! All frames converted to WebP.");
