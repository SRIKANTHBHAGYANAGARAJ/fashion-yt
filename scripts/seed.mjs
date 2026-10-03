import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "data/catalog.json"), "utf8"));
const posts = JSON.parse(readFileSync(join(root, "data/posts.json"), "utf8"));

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is required");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db();

async function upsertMany(name, docs, key) {
  const col = db.collection(name);
  for (const doc of docs) {
    await col.updateOne({ [key]: doc[key] }, { $set: doc }, { upsert: true });
  }
}

await upsertMany("categories", catalog.categories, "id");
await upsertMany("products", catalog.products, "id");
await upsertMany("posts", posts, "slug");

await db.collection("coupons").updateOne(
  { code: "VALE10" },
  {
    $set: {
      code: "VALE10",
      type: "percent",
      value: 10,
      minSubtotal: 50,
      active: true,
    },
  },
  { upsert: true },
);

await db.collection("settings").updateOne(
  { _key: "store" },
  {
    $set: {
      _key: "store",
      name: "Atelier Vale",
      tagline: "Clothes that stay sharp.",
      logo: "/atelier-vale/logo.svg",
      defaultLocale: "en",
      defaultCurrency: "USD",
      defaultTheme: "light",
      enableCod: true,
    },
  },
  { upsert: true },
);

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();
if (adminEmail) {
  const existing = await db.collection("users").findOne({ email: adminEmail });
  if (!existing) {
    const password = randomBytes(9).toString("base64url");
    const passwordHash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({
      id: crypto.randomUUID(),
      email: adminEmail,
      name: "Atelier Vale",
      passwordHash,
      role: "admin",
      addresses: [],
      createdAt: new Date().toISOString(),
    });
    console.log(`Admin user created for ${adminEmail}. Password (shown once): ${password}`);
  } else if (existing.role !== "admin") {
    await db.collection("users").updateOne({ email: adminEmail }, { $set: { role: "admin" } });
  }
}

await db.collection("users").createIndex({ email: 1 }, { unique: true });
await db.collection("products").createIndex({ slug: 1 }, { unique: true });
await db.collection("orders").createIndex({ orderNumber: 1 }, { unique: true });
await db.collection("orders").createIndex({ stripeSessionId: 1 }, { unique: true, sparse: true });
await db.collection("coupons").createIndex({ code: 1 }, { unique: true });
await db.collection("newsletter").createIndex({ email: 1 }, { unique: true });

console.log("Seed complete.");
await client.close();
