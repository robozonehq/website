import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));

const OUT_W = 960;
const OUT_H = 1200;
const FACE_WIDTH = 0.46;
const HEAD_TOP = 0.085;

const people = [
  { name: "sammy", file: "sammy.png", faceBox: [187, 194, 147], eyesX: 261, crown: 149, headTop: 0.087 },
  { name: "daksh", file: "daksh.jpg", faceBox: [371, 489, 372], eyesX: 556, crown: 328 },
  { name: "nitish", file: "nitish.jpg", faceBox: [483, 534, 324], eyesX: 655, crown: 331 },
  { name: "rohan", file: "rohan.jpg", faceBox: [298, 461, 524], eyesX: 562.5, crown: 254 },
];

for (const p of people) {
  const src = path(`src/assets/team/originals/${p.file}`);
  const meta = await sharp(src).metadata();
  const frameW = p.faceBox[2] / FACE_WIDTH;
  const frameH = frameW * (OUT_H / OUT_W);
  let left = p.eyesX - frameW / 2;
  let top = p.crown - (p.headTop ?? HEAD_TOP) * frameH;

  left = Math.min(Math.max(0, left), meta.width - frameW);
  top = Math.min(Math.max(0, top), meta.height - frameH);

  const region = {
    left: Math.round(left),
    top: Math.round(top),
    width: Math.round(Math.min(frameW, meta.width)),
    height: Math.round(Math.min(frameH, meta.height)),
  };
  const upscale = OUT_W / region.width;

  let img = sharp(src).extract(region).resize(OUT_W, OUT_H, { kernel: "lanczos3" });
  if (upscale > 1.2) img = img.sharpen({ sigma: 0.7, m1: 0.6, m2: 1.2 });
  await img.flatten({ background: "#ffffff" }).jpeg({ quality: 90, mozjpeg: true }).toFile(path(`src/assets/team/${p.name}.jpg`));

  const shift = ((p.eyesX - region.left) / region.width - 0.5) * 100;
  console.log(
    `${p.name}: crop ${region.width}×${region.height} at (${region.left},${region.top}), scale ×${upscale.toFixed(2)}, eyes ${shift >= 0 ? "+" : ""}${shift.toFixed(1)}% from center`,
  );
}
