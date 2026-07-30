import Link from "next/link";
import {
  ArrowUpRight,
  ChefHat,
  CreditCard,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Table2,
  UsersRound,
  UserRound,
} from "lucide-react";

export default function Home() {
  const routes = [
    { destination: "/server-ordering", label: "Guest menu", copy: "Live ordering with dietary context.", icon: ScanLine },
    { destination: "/queue", label: "Waitlist", copy: "Arrival estimates and seating flow.", icon: UsersRound },
    { destination: "/service", label: "Service floor", copy: "Table status and next actions.", icon: Table2 },
    { destination: "/kitchen", label: "Kitchen line", copy: "Tickets, timing and safety checks.", icon: ChefHat },
    { destination: "/inventory", label: "Pantry", copy: "Ingredient levels and menu impact.", icon: Leaf },
    { destination: "/safety", label: "SafePlate", copy: "Dietary relay from order to handoff.", icon: ShieldCheck },
    { destination: "/analytics", label: "Signals", copy: "Operational insights for the shift.", icon: Sparkles },
    { destination: "/billing", label: "Billing", copy: "Receipts, discounts and closeout.", icon: CreditCard },
  ];

  return (
    <main className="portal">
      <section className="portal-hero">
        <p>DINE AI</p>
        <h1>
          Every service beat, <i>in sync.</i>
        </h1>
        <span>
          A live restaurant operating system for guests, service, kitchen,
          inventory and SafePlate dietary handoffs.
        </span>
        <div className="portal-actions">
          <Link className="launch" href="/guest">
            Explore as a guest <ArrowUpRight size={18} />
          </Link>
          <Link className="portal-signin" href="/auth">
            <UserRound size={17} /> Sign in
          </Link>
        </div>
        <i className="orbit orbit-one" />
        <i className="orbit orbit-two" />
      </section>
      <section className="route-grid" aria-label="Workspaces">
        {routes.map(({ destination, label, copy, icon: Icon }) => (
          <Link
            className="route-card"
            href={`/auth?next=${encodeURIComponent(destination)}`}
            key={destination}
          >
            <Icon size={22} />
            <h2>{label}</h2>
            <p>{copy}</p>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </section>
    </main>
  );
}
