import fs from "fs";
const envLocal = fs.readFileSync(".env.local", "utf8");
envLocal.split("\n").forEach(line => {
  const [key, ...values] = line.split("=");
  if (key && values.length > 0) process.env[key.trim()] = values.join("=").trim().replace(/^['"]|['"]$/g, '');
});
import { connectDB } from '../lib/db';
import { MenuItem, Order } from '../lib/models';
connectDB().then(() => Promise.all([MenuItem.deleteMany({}), Order.deleteMany({})])).then(() => {
  console.log("DB cleared");
  process.exit(0);
});
