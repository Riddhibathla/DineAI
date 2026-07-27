import { connectDB } from "@/lib/db";
import { MenuItem, Restaurant } from "@/lib/models";
import { GuestClient } from "./guest-client";

export default async function GuestPage() {
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug: "luma-house" }).lean() as any;
  if (!restaurant) return null;

  const items = await MenuItem.find({ restaurantId: restaurant._id, archivedAt: null }).lean() as any[];
  
  const transformedItems = items.map((i) => ({
    id: String(i._id),
    name: i.name,
    description: i.description || "",
    priceCents: i.priceCents,
    tags: i.tags || [],
    image: i.imageUrl || "grove",
    prepMinutes: i.prepTimeMinutes || 15,
    availability: i.isAvailable ? "AVAILABLE" : "REVIEW",
  }));

  return (
    <GuestClient 
      menu={transformedItems} 
      restaurant={{ 
        name: restaurant.name, 
        activeTables: 12, 
        totalTables: restaurant.capacity || 20 
      }} 
    />
  );
}
