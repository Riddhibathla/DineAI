import fs from "fs";
const envLocal = fs.readFileSync(".env.local", "utf8");
envLocal.split("\n").forEach(line => {
  const [key, ...values] = line.split("=");
  if (key && values.length > 0) process.env[key.trim()] = values.join("=").trim().replace(/^['"]|['"]$/g, '');
});
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { connectDB } from "../lib/db";
import {
  Ingredient, MenuCategory, MenuItem, Restaurant, RestaurantTable, User,
} from "../lib/models";

async function seed() {
  await connectDB();
  const restaurant = await Restaurant.findOneAndUpdate(
    { slug: "luma-house" },
    {
      $set: {
        name: "Luma House",
        currency: "USD",
        taxBasisPoints: 825,
        expectedDiningMinutes: 75,
        services: ["Dine-in", "Dietary assistance", "Accessible seating"],
        operatingHours: { friday: ["17:00", "23:00"] },
      },
    },
    { upsert: true, new: true },
  );

  const demoPassword = process.env.SEED_MANAGER_PASSWORD || "PulseDemo!2026";
  const passwordHash = await bcrypt.hash(demoPassword, 12);
  const users = [
    ["customer@restaurantpulse.demo", "Maya Chen", "CUSTOMER"],
    ["server@restaurantpulse.demo", "Sam Rivera", "SERVER"],
    ["kitchen@restaurantpulse.demo", "Jordan Lee", "KITCHEN"],
    [process.env.SEED_MANAGER_EMAIL || "manager@restaurantpulse.demo", "Alex Morgan", "MANAGER"],
  ];
  for (const [email, name, role] of users) {
    await User.findOneAndUpdate(
      { restaurantId: restaurant._id, email },
      { $set: { name, role, passwordHash, emailVerified: new Date(), archivedAt: null } },
      { upsert: true },
    );
  }

  for (let index = 1; index <= 14; index++) {
    await RestaurantTable.findOneAndUpdate(
      { restaurantId: restaurant._id, label: `T${String(index).padStart(2, "0")}` },
      { $setOnInsert: { capacity: index % 4 === 0 ? 6 : index % 3 === 0 ? 4 : 2, publicToken: crypto.randomUUID() }, $set: { status: index <= 10 ? "OCCUPIED" : "AVAILABLE" } },
      { upsert: true },
    );
  }

  const ingredientData = [
    ["Aubergine", 18, "COUNT", [], []],
    ["Tahini", 1400, "GRAM", ["SESAME"], []],
    ["Salmon", 8, "COUNT", ["FISH"], []],
    ["Miso glaze", 900, "MILLILITRE", ["SOY"], []],
    ["Wild mushrooms", 1700, "GRAM", [], []],
    ["Pappardelle", 2200, "GRAM", ["GLUTEN", "EGG"], []],
    ["Garden greens", 2600, "GRAM", [], []],
    ["Heritage chicken", 4, "COUNT", [], []],
  ] as const;
  const ingredients = new Map<string, { _id: unknown }>();
  for (const [name, quantity, unit, allergens, crossContact] of ingredientData) {
    const item = await Ingredient.findOneAndUpdate(
      { restaurantId: restaurant._id, name },
      { $set: { quantity, unit, allergens, crossContact, verified: true, available: quantity > 0, lowStockThreshold: unit === "COUNT" ? 5 : 500 } },
      { upsert: true, new: true },
    );
    ingredients.set(name, item as unknown as { _id: unknown });
  }

  const categories = new Map<string, { _id: unknown }>();
  for (const [sortOrder, name] of ["Small plates", "From the hearth", "House pasta", "Dessert"].entries()) {
    const category = await MenuCategory.findOneAndUpdate(
      { restaurantId: restaurant._id, name },
      { $set: { sortOrder } },
      { upsert: true, new: true },
    );
    categories.set(name, category as unknown as { _id: unknown });
  }

  const menu = [
    ["Butter Chicken", "From the hearth", 1850, 20, "Heritage chicken", 1, "https://images.unsplash.com/photo-1603894584373-59f69622edd0?w=500&q=80"],
    ["Paneer Tikka Masala", "From the hearth", 1650, 15, "Aubergine", 1, "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80"],
    ["Garlic Naan", "Small plates", 450, 5, "Pappardelle", 1, "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80"],
    ["Vegetable Biryani", "House pasta", 1450, 18, "Wild mushrooms", 1, "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80"],
    ["Samosa Chaat", "Small plates", 850, 10, "Garden greens", 1, "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80"],
  ] as const;
  for (const [name, category, priceCents, basePrepMinutes, ingredient, quantity, imageUrl] of menu) {
    await MenuItem.findOneAndUpdate(
      { restaurantId: restaurant._id, name },
      { $set: { categoryId: categories.get(category)!._id, description: "Authentic Indian flavors prepared to order.", priceCents, basePrepMinutes, manualAvailability: "AUTO", featured: true, imageUrl, recipe: [{ ingredientId: ingredients.get(ingredient)!._id, quantity, removable: false }], archivedAt: null } },
      { upsert: true },
    );
  }

  console.log(`Seed complete. Demo password: ${demoPassword}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
