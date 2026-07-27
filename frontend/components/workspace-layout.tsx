"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Bell, ChefHat, CreditCard, Leaf, Menu, ScanLine, ShieldCheck, Sparkles, Table2, UsersRound, X } from "lucide-react";

type Page = "guest" | "queue" | "service" | "kitchen" | "inventory" | "safety" | "analytics" | "billing" | "table";

const links: Array<{ href: string; label: string; icon: typeof ScanLine }> = [
  { href: "/guest", label: "Guest menu", icon: ScanLine }, { href: "/queue", label: "Waitlist", icon: UsersRound },
  { href: "/service", label: "Service floor", icon: Table2 }, { href: "/kitchen", label: "Kitchen line", icon: ChefHat },
  { href: "/inventory", label: "Pantry", icon: Leaf }, { href: "/safety", label: "SafePlate", icon: ShieldCheck },
  { href: "/analytics", label: "Signals", icon: Sparkles }, { href: "/billing", label: "Billing", icon: CreditCard },
];

const meta: Record<Page, { lens: string; title: string; description: string }> = {
  guest: { lens: "Guest lens", title: "Choose with confidence.", description: "Live dishes, honest timing and dietary context that stays with your table." },
  queue: { lens: "Arrival lens", title: "Waiting, made visible.", description: "Every party gets a useful estimate and staff sees the best next table." },
  service: { lens: "Floor lens", title: "Feel the room, not the scramble.", description: "The guest moments that need a person, arranged by urgency." },
  kitchen: { lens: "Kitchen lens", title: "A quieter way to run the line.", description: "Tickets hold their timing, safety context and next action in one place." },
  inventory: { lens: "Pantry lens", title: "See the ingredient ripple.", description: "Stock changes become useful decisions before they become guest disappointments." },
  safety: { lens: "SafePlate lens", title: "Context should never get lost.", description: "A visible safety relay from the guest's choice to the final handoff." },
  analytics: { lens: "Signal lens", title: "Patterns that tell you what to do.", description: "Operational intelligence with an action attached to every insight." },
  billing: { lens: "Close lens", title: "Close the table with grace.", description: "Orders, discounts and payment status stay clear until the final receipt." },
  table: { lens: "Table session", title: "Welcome to table 08.", description: "Your menu, dietary notes, order and service requests live right here." },
};

export function WorkspaceLayout({ page, children }: { page: Page; children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  
  return (
    <div className="constellation">
      <header className="constellation-top">
        <Link href="/" className="pulse-logo">
          <span>D</span><b>DINE<br />AI</b>
        </Link>
        <nav className={drawer ? "nav-open" : ""}>
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={page === href.slice(1) || (page === "table" && href === "/guest") ? "current" : ""}>
              <Icon size={16} />{label}
            </Link>
          ))}
        </nav>
        <div className="top-tools">
          <button onClick={() => toast.info("3 operational updates") } aria-label="Notifications">
            <Bell size={18} /><i>3</i>
          </button>
          <button className="nav-toggle" onClick={() => setDrawer(!drawer)} aria-label="Toggle navigation">
            {drawer ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>
      <main className="constellation-main">
        <div className="lens">
          <p>{meta[page].lens}</p>
          <Link href="/" aria-label="Back to all workspaces"><ArrowLeft size={16} /></Link>
        </div>
        <section className="workspace-heading">
          <div>
            <h1>{meta[page].title}</h1>
            <p>{meta[page].description}</p>
          </div>
          <div className="service-beacon">
            <i /><span>Live at Luma House</span>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}
