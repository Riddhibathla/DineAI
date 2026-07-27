import { connectDB } from "@/lib/db";
import { QueueEntry, Restaurant } from "@/lib/models";
import { QueueClient } from "./queue-client";

export default async function QueuePage() {
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug: "luma-house" }).lean() as any;
  if (!restaurant) return null;

  const queueEntries = await QueueEntry.find({ restaurantId: restaurant._id, status: "WAITING" })
    .sort({ position: 1 })
    .lean() as any[];

  const transformedQueue = queueEntries.map((q) => ({
    dbId: String(q._id),
    position: q.position,
    name: q.guestName,
    party: q.partySize,
    note: q.notes || "No notes",
    estimate: q.estimatedWaitMinutes,
  }));

  return <QueueClient initialQueue={transformedQueue} />;
}
