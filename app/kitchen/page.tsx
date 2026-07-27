import { connectDB } from "@/lib/db";
import { Order, Restaurant } from "@/lib/models";
import { KitchenClient } from "./kitchen-client";

export default async function KitchenPage() {
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug: "luma-house" }).lean() as any;
  if (!restaurant) return null;
  
  const activeOrders = await Order.find({ 
    restaurantId: restaurant._id,
    status: { $in: ["SUBMITTED", "ACKNOWLEDGED", "PREPARING", "REQUIRES_ATTENTION"] }
  }).sort({ createdAt: 1 }).populate("tableId").lean() as any[];

  const transformedOrders = activeOrders.map((o) => {
    const table = o.tableId as any;
    return {
      id: o.publicId,
      dbId: String(o._id),
      table: table ? table.label : "Takeaway",
      status: o.status,
      elapsed: Math.floor((Date.now() - new Date(o.createdAt).getTime()) / 60000),
      guest: "Guest Order", // Could derive from table session
      items: o.items.map((i: any) => `${i.quantity}x ${i.name}`),
      safety: o.constraintsSnapshot?.length > 0 ? o.constraintsSnapshot.join(", ") : null,
    };
  });

  return <KitchenClient initialOrders={transformedOrders} />;
}
