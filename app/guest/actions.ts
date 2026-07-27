"use server";

import { connectDB } from "@/lib/db";
import { Order, MenuItem, Restaurant } from "@/lib/models";
import crypto from "node:crypto";
import { revalidatePath } from "next/cache";

export async function submitGuestOrder(itemIds: string[], constraints: string[]) {
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug: "luma-house" });
  if (!restaurant) throw new Error("Restaurant not found");

  const items = await MenuItem.find({ _id: { $in: itemIds } });
  
  // Build items array with quantities
  const itemCounts = itemIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const orderItems = Object.entries(itemCounts).map(([id, quantity]) => {
    const item = items.find(i => String(i._id) === id);
    return {
      menuItemId: item._id,
      name: item.name,
      quantity,
      priceCents: item.priceCents
    };
  });

  const totalCents = orderItems.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);

  const order = await Order.create({
    restaurantId: restaurant._id,
    tableId: null, // Takeaway
    publicId: "RP-" + crypto.randomInt(1000, 9999),
    status: constraints.length > 0 ? "REQUIRES_ATTENTION" : "SUBMITTED",
    totalCents,
    items: orderItems,
    constraintsSnapshot: constraints
  });

  revalidatePath("/kitchen");

  return { success: true, orderId: order.publicId };
}
