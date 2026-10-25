import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));

const logo = path("src/assets/brand/logo-padded.png");
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

const opaqueAt = async (size) =>
  sharp(gradientSquare(size))
    .composite([{ input: await logoAt(size) }])
    .png({ compressionLevel: 9 })
    .toBuffer();

await writeFile(path("public/images/logo.png"), await logoAt(512));

await writeFile(path("public/favicon-32.png"), await logoAt(32));
await writeFile(path("public/favicon-192.png"), await logoAt(192));
await writeFile(path("public/apple-touch-icon.png"), await opaqueAt(180));

{
  const png = await logoAt(32);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  await writeFile(path("public/images/favicon.ico"), Buffer.concat([header, entry, png]));
}

const meta = await sharp(photo).metadata();
const cropHeight = Math.round(meta.width * (630 / 1200));
const top = Math.min(150, meta.height - cropHeight);
await sharp(photo)
  .extract({ left: 0, top, width: meta.width, height: cropHeight })
  .resize(1200, 630)
  .composite([{ input: await logoAt(128), left: 36, top: 36 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path("public/og-image.jpg"));

console.log(
  "Wrote public/images/logo.png, public/images/favicon.ico, public/favicon-32.png, public/favicon-192.png, public/apple-touch-icon.png, public/og-image.jpg",
);
