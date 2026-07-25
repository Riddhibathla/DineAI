import Link from "next/link";
import { ArrowUpRight, ChefHat, Leaf, ScanLine, Sparkles, UsersRound, type LucideIcon } from "lucide-react";

const routes: Array<{ title: string; text: string; href: string; icon: LucideIcon }> = [
  { title: "Guest menu", text: "Live availability, dietary context and orders", href: "/guest", icon: ScanLine },
  { title: "Waitlist", text: "Queue position and transparent table estimates", href: "/queue", icon: UsersRound },
  { title: "Service floor", text: "Tables, guest requests and billing", href: "/service", icon: Sparkles },
  { title: "Kitchen line", text: "Tickets, timing and fulfilment", href: "/kitchen", icon: ChefHat },
  { title: "Pantry", text: "Ingredient levels and menu impact", href: "/inventory", icon: Leaf },
];

export default function Home() {
  return <main className="portal"><section className="portal-hero"><p>RESTAURANT PULSE / SERVICE CONSTELLATION</p><h1>The restaurant,<br /><i>in orbit.</i></h1><span>Every guest moment is a signal. Every team gets the next move.</span><Link href="/guest" className="launch">Enter live restaurant <ArrowUpRight size={18} /></Link><div className="orbit orbit-one" /><div className="orbit orbit-two" /></section><section className="route-grid">{routes.map(({ title, text, href, icon: Icon }) => <Link href={href} key={title} className="route-card"><Icon size={24} /><div><h2>{title}</h2><p>{text}</p></div><ArrowUpRight size={19} /></Link>)}</section></main>;
}
