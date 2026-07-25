import { menu, restaurant } from "@/lib/demo-data";
export function GET() { return Response.json({ restaurant, data: menu }); }
