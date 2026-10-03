import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "data/catalog.json"), "utf8"));
const posts = JSON.parse(readFileSync(join(root, "data/posts.json"), "utf8"));

function ensureDir(file) {
  mkdirSync(dirname(file), { recursive: true });
}

function makeWebp(rel, w, h, bg, title) {
  const out = join(root, "public", rel.replace(/^\//, ""));
  if (existsSync(out)) return;
  ensureDir(out);
  const png = out.replace(/\.webp$/, ".png");
  const svg = out.replace(/\.webp$/, ".svg");
  const safe = title.replace(/[&<>]/g, " ").slice(0, 48);
  const font = Math.max(18, Math.round(w / 22));
  writeFileSync(
    svg,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="#${bg.replace("0x", "")}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, serif" font-size="${font}" fill="#111111">${safe}</text>
</svg>`,
  );
  execFileSync("rsvg-convert", ["-w", String(w), "-h", String(h), "-o", png, svg], {
    stdio: "pipe",
  });
  execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", out], { stdio: "pipe" });
  unlinkSync(svg);
  unlinkSync(png);
}

const paper = "0xF4EDE6";
const bone = "0xFAFAF8";
const clay = "0xE8E2DA";
const sage = "0xC9D2C0";
const ink = "0xD8D4CE";

makeWebp("/atelier-vale/hero/slide-1.webp", 1920, 900, paper, "Knits that hold");
makeWebp("/atelier-vale/hero/slide-2.webp", 1920, 900, clay, "Denim, cut to last");
makeWebp("/atelier-vale/hero/slide-3.webp", 1920, 900, sage, "Wool for the commute");
makeWebp("/atelier-vale/banners/sale.webp", 1920, 640, paper, "First order 10% off");
makeWebp("/atelier-vale/og.jpg".replace(".jpg", ".webp"), 1200, 630, paper, "Atelier Vale");

for (const cat of catalog.categories) {
  makeWebp(cat.image, 800, 800, paper, cat.name);
}

const shorts = [
  "Knit crop",
  "Work shirt",
  "Column dress",
  "Court shoe",
  "Soft tote",
  "Wool scarf",
  "Camp shirt",
  "Pullover",
];
shorts.forEach((title, i) => {
  makeWebp(`/atelier-vale/shorts/short-${i + 1}.webp`, 720, 1280, i % 2 ? clay : paper, title);
});

for (const post of posts) {
  makeWebp(post.image, 1200, 800, paper, post.title);
}

const tints = [paper, clay, sage, ink];
for (const product of catalog.products) {
  for (let n = 1; n <= 4; n++) {
    makeWebp(`/atelier-vale/products/${product.slug}-${n}.webp`, 900, 1200, tints[n - 1], product.name);
  }
}

const ogPng = join(root, "public/atelier-vale/og.webp");
const ogJpg = join(root, "public/atelier-vale/og.jpg");
if (existsSync(ogPng) && !existsSync(ogJpg)) {
  execFileSync("sips", ["-s", "format", "jpeg", ogPng, "--out", ogJpg], { stdio: "pipe" });
}

console.log("Placeholders written.");
