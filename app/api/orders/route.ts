import { orders } from "@/lib/demo-data";
export function GET() { return Response.json({ data: orders, updatedAt: new Date().toISOString() }); }
