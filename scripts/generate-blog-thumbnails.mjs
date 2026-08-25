import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import blogData from "../src/data/blog.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const CARD_WIDTH = 512;
const CARD_QUALITY = 80;

const images = [
  ...new Set(blogData.blogs.map((blog) => blog.image)),
];

let generated = 0;
let skipped = 0;

for (const imagePath of images) {
  const sourcePath = path.join(publicDir, imagePath);
  const dir = path.dirname(sourcePath);
  const outputPath = path.join(dir, "hero-card.webp");

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Skipping missing image: ${imagePath}`);
    skipped++;
    continue;
  }

  const sourceStat = fs.statSync(sourcePath);
  const outputExists = fs.existsSync(outputPath);
  if (outputExists) {
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtimeMs >= sourceStat.mtimeMs) {
      skipped++;
      continue;
    }
  }

  await sharp(sourcePath)
    .resize({ width: CARD_WIDTH, withoutEnlargement: true })
    .webp({ quality: CARD_QUALITY })
    .toFile(outputPath);

  const outputSize = fs.statSync(outputPath).size;
  console.log(
    `Generated ${path.relative(publicDir, outputPath)} (${Math.round(outputSize / 1024)} KB)`
  );
  generated++;
}

console.log(`Done: ${generated} generated, ${skipped} skipped.`);
