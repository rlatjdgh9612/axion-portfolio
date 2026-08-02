import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("public/assets/projects");
const outputDir = path.join(sourceDir, "dark");
const sourceFiles = (await readdir(sourceDir)).filter((file) => file.endsWith("-card.png"));

await mkdir(outputDir, { recursive: true });

for (const file of sourceFiles) {
  const sourcePath = path.join(sourceDir, file);
  const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixelCount = width * height;
  const background = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let readIndex = 0;
  let writeIndex = 0;

  const pixel = (index) => {
    const offset = index * channels;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = data[offset + 3];
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
    return { red, green, blue, alpha, spread };
  };

  const enqueue = (index, fromIndex = -1) => {
    if (background[index]) return;
    const current = pixel(index);
    if (current.alpha >= 245 && current.spread > 18) return;
    if (fromIndex >= 0 && current.alpha >= 245) {
      const previous = pixel(fromIndex);
      const step = Math.max(
        Math.abs(current.red - previous.red),
        Math.abs(current.green - previous.green),
        Math.abs(current.blue - previous.blue),
      );
      if (step > 4) return;
    }
    background[index] = 1;
    queue[writeIndex++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (readIndex < writeIndex) {
    const index = queue[readIndex++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) enqueue(index - 1, index);
    if (x < width - 1) enqueue(index + 1, index);
    if (y > 0) enqueue(index - width, index);
    if (y < height - 1) enqueue(index + width, index);
  }

  for (let index = 0; index < pixelCount; index += 1) {
    if (!background[index]) continue;
    const offset = index * channels;
    const sourceLightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
    const x = index % width;
    const y = Math.floor(index / width);
    const normalizedX = (x - width / 2) / (width / 2);
    const normalizedY = (y - height / 2) / (height / 2);
    const centerGlow = Math.max(0, 1 - Math.hypot(normalizedX, normalizedY));
    const shadowDepth = Math.max(0, 245 - sourceLightness) * 0.15;
    const target = Math.max(24, Math.min(50, Math.round(38 + centerGlow * 10 - shadowDepth)));
    data[offset] = target;
    data[offset + 1] = target;
    data[offset + 2] = target;
    data[offset + 3] = 255;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, file));
}

console.log(`Generated ${sourceFiles.length} dark project cards in ${outputDir}`);
