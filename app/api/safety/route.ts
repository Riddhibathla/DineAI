import { orders } from "@/lib/demo-data";
export function GET() { return Response.json({ order: orders[0], checks: ["Guest constraints captured", "Server acknowledgement complete", "Kitchen acknowledgement required", "Delivery verification pending"] }); }
