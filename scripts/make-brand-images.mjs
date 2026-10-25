import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));

const logo = path("src/assets/brand/logo-padded.png");
const favicon = path("src/assets/brand/logo-transparent.png");
const photo = path("src/assets/photos/2024-summer-plant-watering-project.jpg");

const GRADIENT_FROM = "#27a9ff";
const GRADIENT_TO = "#69b3e8";

const gradientSquare = (size) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${GRADIENT_FROM}"/><stop offset="1" stop-color="${GRADIENT_TO}"/>
      </linearGradient></defs>
      <rect width="${size}" height="${size}" fill="url(#g)"/>
    </svg>`,
  );

const logoAt = (size) => sharp(logo).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
const faviconAt = (size) =>
  sharp(favicon).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer();

const opaqueAt = async (size) =>
  sharp(gradientSquare(size))
    .composite([{ input: await logoAt(size) }])
    .png({ compressionLevel: 9 })
    .toBuffer();

async function ico(sizes) {
  const images = await Promise.all(sizes.map((s) => faviconAt(s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s >= 256 ? 0 : s, 0);
    e.writeUInt8(s >= 256 ? 0 : s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += images[i].length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images]);
}

await writeFile(path("public/images/logo.png"), await logoAt(512));

const icoFile = await ico([16, 32, 48]);
await writeFile(path("public/favicon.ico"), icoFile);
await writeFile(path("public/images/favicon.ico"), icoFile);
for (const size of [32, 48, 96, 192]) {
  await writeFile(path(`public/favicon-${size}.png`), await faviconAt(size));
}

await writeFile(path("public/apple-touch-icon.png"), await opaqueAt(180));
await writeFile(path("public/icon-512.png"), await opaqueAt(512));
await writeFile(path("public/icon-192.png"), await opaqueAt(192));

const meta = await sharp(photo).metadata();
const cropHeight = Math.round(meta.width * (630 / 1200));
const top = Math.min(150, meta.height - cropHeight);
await sharp(photo)
  .extract({ left: 0, top, width: meta.width, height: cropHeight })
  .resize(1200, 630)
  .composite([{ input: await logoAt(128), left: 36, top: 36 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path("public/og-image.jpg"));

console.log("Wrote favicons (transparent), touch and app icons, logo.png, and og-image.jpg in /public");
