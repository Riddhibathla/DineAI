import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  ChefHat,
  CheckCircle2,
  CreditCard,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Table2,
  UsersRound,
  UserRound,
} from "lucide-react";
import { menu } from "@/lib/demo-data";

const routes = [
  { destination: "/server-ordering", label: "Guest menu", copy: "Live ordering with dietary context.", icon: ScanLine },
  { destination: "/queue", label: "Waitlist", copy: "Arrival estimates and seating flow.", icon: UsersRound },
  { destination: "/service", label: "Service floor", copy: "Table status and next actions.", icon: Table2 },
  { destination: "/kitchen", label: "Kitchen line", copy: "Tickets, timing and safety checks.", icon: ChefHat },
  { destination: "/inventory", label: "Pantry", copy: "Ingredient levels and menu impact.", icon: Leaf },
  { destination: "/safety", label: "SafePlate", copy: "Dietary context from order to handoff.", icon: ShieldCheck },
  { destination: "/analytics", label: "Signals", copy: "Operational insights for every shift.", icon: Sparkles },
  { destination: "/billing", label: "Billing", copy: "Receipts, payments and closeout.", icon: CreditCard },
];

const moments = [
  { title: "A seat, without the uncertainty", text: "Guests can reserve a place, see the wait, and arrive with the right context already captured.", icon: UsersRound },
  { title: "An order everyone can trust", text: "Preferences, payment choice and kitchen status travel with every dish—without repeated questions.", icon: CheckCircle2 },
  { title: "A calmer handoff at every table", text: "Servers get the next action while guests receive a simple, timely update when food is ready.", icon: BellRing },
];

export default function Home() {
  const heroDish = menu[4];
  const secondDish = menu[9];
  const thirdDish = menu[3];

  return (
    <main className="portal">
      <nav className="portal-nav" aria-label="Primary navigation">
        <Link href="/" className="portal-brand" aria-label="Dine AI home">
          <span>D</span><b>DINE AI</b>
        </Link>
        <div className="portal-nav-links">
          <a href="#experience">Experience</a>
          <a href="#operations">Operations</a>
          <Link href="/auth" className="portal-nav-signin">Sign in <ArrowRight size={15} /></Link>
        </div>
      </nav>

      <section className="portal-hero" aria-labelledby="portal-title">
        <div className="portal-hero-copy reveal">
          <p className="portal-eyebrow">RESTURANT SERVICE, CONNECTED</p>
          <h1 id="portal-title">The table feels easy. <em>The work behind it should too.</em></h1>
          <span>
            DINE AI connects the moments your guests see with the coordination your team needs—from a first booking to the final bill.
          </span>
          <div className="portal-actions">
            <Link className="launch" href="/guest">Explore as a guest <ArrowUpRight size={18} /></Link>
            <Link className="portal-signin" href="/auth"><UserRound size={17} /> Team sign in</Link>
          </div>
          <div className="portal-proof">
            <div><b>18 min</b><span>live wait estimate</span></div>
            <div><b>1 view</b><span>for guest to kitchen</span></div>
            <div><b>Live</b><span>service updates</span></div>
          </div>
        </div>
        <div className="portal-hero-media reveal reveal-late">
          <img src={heroDish.image} alt={heroDish.name} />
          <div className="hero-media-caption"><span>Tonight at Tandoor Bistro</span><b>{heroDish.name}</b><small>Prepared to order · 19 min</small></div>
          <div className="hero-status"><i /><span>Kitchen in rhythm</span></div>
        </div>
      </section>

      <section className="portal-marquee" aria-label="Dine AI capabilities">
        <span>GUEST EXPERIENCE</span><i /> <span>SEAT BOOKING</span><i /> <span>LIVE KITCHEN</span><i /> <span>SAFEPLATE</span><i /> <span>PAYMENT CLARITY</span>
      </section>

      <section id="experience" className="portal-section portal-story">
        <div className="section-intro reveal">
          <p className="portal-eyebrow">ONE SERVICE, MANY SMALL MOMENTS</p>
          <h2>Give every guest a thoughtful experience—without making the team chase information.</h2>
        </div>
        <div className="moment-grid">
          {moments.map(({ title, text, icon: Icon }, index) => (
            <article className="moment-card reveal" style={{ animationDelay: `${index * 100}ms` }} key={title}>
              <span><Icon size={20} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>0{index + 1}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section story-split">
        <div className="story-image-stack reveal">
          <img className="story-image-large" src={secondDish.image} alt={secondDish.name} />
          <img className="story-image-small" src={thirdDish.image} alt={thirdDish.name} />
          <div className="story-chip"><CheckCircle2 size={16} /> Dietary notes carried through</div>
        </div>
        <div className="story-copy reveal reveal-late">
          <p className="portal-eyebrow">BUILT FOR THE ACTUAL SHIFT</p>
          <h2>Every choice stays visible where it matters.</h2>
          <p>When a guest filters the menu, books a seat or selects UPI, card or counter payment, that decision moves naturally into the service flow. There is no second notebook, no handover gap and no guessing at the pass.</p>
          <ul>
            <li><CheckCircle2 size={17} /> Guest preferences follow each order.</li>
            <li><CheckCircle2 size={17} /> Kitchen progress reaches the guest as a clear update.</li>
            <li><CheckCircle2 size={17} /> Billing and service see the same payment context.</li>
          </ul>
          <Link href="/guest" className="text-link">See the guest experience <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section id="operations" className="portal-section operations-section">
        <div className="section-intro reveal">
          <p className="portal-eyebrow">THE WHOLE RESTAURANT, IN STEP</p>
          <h2>Choose the workspace that needs your attention.</h2>
        </div>
        <div className="route-grid" aria-label="Restaurant workspaces">
          {routes.map(({ destination, label, copy, icon: Icon }, index) => (
            <Link className="route-card reveal" style={{ animationDelay: `${(index % 4) * 70}ms` }} href={`/auth?next=${encodeURIComponent(destination)}`} key={destination}>
              <Icon size={21} />
              <h3>{label}</h3>
              <p>{copy}</p>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="portal-cta reveal">
        <div><p className="portal-eyebrow">START WITH THE NEXT TABLE</p><h2>Make the next service feel considered.</h2></div>
        <div className="portal-actions"><Link className="launch" href="/guest">Explore as a guest <ArrowUpRight size={18} /></Link><Link className="portal-signin" href="/auth">Sign in for your team</Link></div>
      </section>

      <footer className="portal-footer"><span>© 2026 DINE AI</span><span>Built for considered service.</span><div><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/cookies">Cookies</Link></div></footer>
    </main>
  );
}
