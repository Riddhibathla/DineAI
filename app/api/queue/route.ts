import { queue, restaurant } from "@/lib/demo-data";
export function GET() { return Response.json({ estimateMinutes: restaurant.queueEstimate, data: queue }); }
