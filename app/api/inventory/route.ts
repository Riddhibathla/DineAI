import { inventory } from "@/lib/demo-data";
export function GET() { return Response.json({ data: inventory }); }
