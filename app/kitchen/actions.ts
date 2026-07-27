"use server";

import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: string) {
  await connectDB();
  await Order.findByIdAndUpdate(orderId, { status });
  revalidatePath("/kitchen");
}
