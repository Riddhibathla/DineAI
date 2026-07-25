"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight, Bell, CalendarClock, Check, ChefHat, ChevronRight, CircleAlert,
  ClipboardCheck, Clock3, CookingPot, CreditCard, LayoutDashboard, Leaf,
  MenuSquare, Plus, Search, ShieldCheck, Sparkles, Table2, UsersRound,
  UtensilsCrossed, WalletCards,
} from "lucide-react";
import { toast } from "sonner";

type Role = "Manager" | "Kitchen" | "Service" | "Guest";
type Status = "New" | "Preparing" | "Ready" | "Attention" | "Served";

const roleNav: Record<Role, Array<{ label: string; icon: typeof LayoutDashboard }>> = {
  Manager: [
    { label: "Overview", icon: LayoutDashboard }, { label: "Live operations", icon: CookingPot },
    { label: "Inventory", icon: Leaf }, { label: "Menu studio", icon: MenuSquare },
    { label: "Insights", icon: Sparkles },
  ],
  Kitchen: [
    { label: "Kitchen line", icon: ChefHat }, { label: "Safety relay", icon: ShieldCheck }, { label: "Completed", icon: ClipboardCheck },
  ],
  Service: [
    { label: "Service floor", icon: UtensilsCrossed }, { label: "Tables", icon: Table2 }, { label: "Waitlist", icon: UsersRound }, { label: "Bills", icon: WalletCards },
  ],
  Guest: [
    { label: "Discover", icon: UtensilsCrossed }, { label: "My table", icon: Table2 }, { label: "My order", icon: ClipboardCheck },
  ],
};

const orders = [
  { id: "#1048", table: "T08", guest: "Maya Chen", items: "Miso salmon · Garden salad", status: "Attention" as Status, age: "14m", amount: "$39.00", safety: "Soy sauce changed" },
  { id: "#1047", table: "T03", guest: "Noah Williams", items: "Heritage chicken × 2", status: "Preparing" as Status, age: "11m", amount: "$56.00", safety: "" },
  { id: "#1046", table: "T11", guest: "Ava Patel", items: "Aubergine · Pappardelle", status: "Ready" as Status, age: "19m", amount: "$36.50", safety: "Gluten preference checked" },
  { id: "#1045", table: "T05", guest: "Liam Jones", items: "Citrus salad × 2", status: "New" as Status, age: "3m", amount: "$25.00", safety: "" },
];

const menu = [
  { id: 1, name: "Ember aubergine", desc: "Tahini, pomegranate, garden herbs", price: 14.5, time: "12 min", tags: ["Vegan", "Gluten-free"], state: "Compatible", stock: "8 left", hue: "aubergine" },
  { id: 2, name: "Miso glazed salmon", desc: "Forbidden rice, charred greens", price: 26.5, time: "18 min", tags: ["Soy", "Fish"], state: "Review", stock: "5 left", hue: "salmon" },
  { id: 3, name: "Wild mushroom pappardelle", desc: "Brown butter, thyme, aged parmesan", price: 22, time: "16 min", tags: ["Vegetarian", "Gluten"], state: "Modify", stock: "7 left", hue: "pasta" },
  { id: 4, name: "Citrus garden", desc: "Fennel, orange, toasted seeds", price: 12.5, time: "8 min", tags: ["Vegan", "Gluten-free"], state: "Compatible", stock: "12 left", hue: "garden" },
];

const statusStyles: Record<Status, string> = {
  New: "status-new", Preparing: "status-progress", Ready: "status-ready", Attention: "status-alert", Served: "status-served",
};

export function RestaurantPulse() {
  const [role, setRole] = useState<Role>("Manager");
  const [section, setSection] = useState("Overview");
  const [cart, setCart] = useState<number[]>([]);
  const [constraints, setConstraints] = useState(["Soy"]);
  const [queueJoined, setQueueJoined] = useState(false);

  const chooseRole = (next: Role) => { setRole(next); setSection(roleNav[next][0].label); };
  return (
    <div className="pulse-shell">
      <aside className="pulse-sidebar">
        <button className="brand" onClick={() => chooseRole("Guest")} aria-label="Restaurant Pulse home">
          <span className="brand-mark"><span>R</span></span><span><b>Restaurant<br />Pulse</b><small>luma house</small></span>
        </button>
        <div className="venue-chip"><span className="live-dot" />Live service <b>19:42</b></div>
        <nav className="side-nav" aria-label="Application navigation">
          <p>Workspace</p>
          {roleNav[role].map(({ label, icon: Icon }) => <button key={label} onClick={() => setSection(label)} className={section === label ? "selected" : ""}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{section === label && <ChevronRight size={15} />}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <p>Switch preview</p>
          <div className="role-picker">{(["Manager", "Kitchen", "Service", "Guest"] as Role[]).map((item) => <button key={item} className={role === item ? "active" : ""} onClick={() => chooseRole(item)}>{item}</button>)}</div>
          <div className="user-card"><span className="avatar">AM</span><span><b>Alex Morgan</b><small>{role} workspace</small></span><ChevronRight size={15} /></div>
        </div>
      </aside>

      <main className="pulse-main">
        <header className="topbar">
          <div className="crumb"><span>Luma House</span><ChevronRight size={14} /><b>{section}</b></div>
          <div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={19} /></button><button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><i>3</i></button><button className="profile-mobile avatar">AM</button></div>
        </header>
        <div className="page-area">
          {role === "Manager" && <ManagerPage section={section} />}
          {role === "Kitchen" && <KitchenPage section={section} />}
          {role === "Service" && <ServicePage section={section} />}
          {role === "Guest" && <GuestPage cart={cart} setCart={setCart} constraints={constraints} setConstraints={setConstraints} queueJoined={queueJoined} setQueueJoined={setQueueJoined} />}
        </div>
      </main>
    </div>
  );
}

function PageTitle({ kicker, title, description, action }: { kicker: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-title"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action}</div>;
}

function ManagerPage({ section }: { section: string }) {
  if (section === "Inventory") return <Inventory />;
  if (section === "Menu studio") return <MenuStudio />;
  if (section === "Insights") return <Insights />;
  if (section === "Live operations") return <LiveOperations />;
  return <Overview />;
}

function Overview() {
  return <>
    <PageTitle kicker="Friday · Dinner service" title="Good evening, Alex." description="The room is moving beautifully. Here’s where your attention matters most." action={<button className="primary-button" onClick={() => toast.success("Live report prepared")}>View live report <ArrowUpRight size={17} /></button>} />
    <section className="metric-grid">
      <Metric label="Revenue today" value="$4,820" delta="+12.4%" icon={<WalletCards />} tone="mint" />
      <Metric label="Active covers" value="86" delta="10 tables occupied" icon={<UsersRound />} tone="peach" />
      <Metric label="Avg. kitchen time" value="16m" delta="2 min faster" icon={<Clock3 />} tone="lavender" />
      <Metric label="Needs attention" value="03" delta="1 safety check" icon={<CircleAlert />} tone="rose" />
    </section>
    <section className="overview-grid">
      <div className="surface order-surface"><div className="surface-heading"><div><p className="section-kicker">Live operations</p><h2>Orders in motion</h2></div><button className="text-button">View all <ChevronRight size={16} /></button></div><OrderTable /></div>
      <div className="side-stack">
        <div className="surface safety-card"><div className="safety-orb"><ShieldCheck size={22} /></div><p className="section-kicker">SafePlate relay</p><h3>An order needs a decision</h3><p>RP-1048’s miso glaze was substituted. Maya’s soy constraint needs acknowledgement before preparation.</p><button onClick={() => toast.info("Opening SafePlate resolution")}>Review safety handoff <ArrowUpRight size={16} /></button></div>
        <div className="surface mini-chart"><div className="surface-heading"><div><p className="section-kicker">Dining room</p><h2>Tonight’s rhythm</h2></div><b className="green">+18%</b></div><div className="bars">{[32, 54, 40, 72, 58, 86, 63, 76, 48, 35, 56, 44].map((height, index) => <span key={index} style={{ height: `${height}%` }} className={index === 5 ? "hot" : ""} />)}</div><div className="axis"><span>5pm</span><span>7pm</span><span>9pm</span><span>11pm</span></div></div>
      </div>
    </section>
  </>;
}

function Metric({ label, value, delta, icon, tone }: { label: string; value: string; delta: string; icon: React.ReactNode; tone: string }) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}>{icon}</div><p>{label}</p><div><h2>{value}</h2><span>{delta}</span></div></div>;
}

function OrderTable() {
  return <div className="order-table">{orders.map((order) => <div className="order-row" key={order.id}><div className="order-id"><b>{order.id}</b><span>{order.table}</span></div><div className="order-guest"><b>{order.guest}</b><span>{order.safety || order.items}</span></div><div><span className={`status ${statusStyles[order.status]}`}>{order.status === "Attention" && "! "}{order.status}</span></div><div className="order-age"><b>{order.age}</b><span>elapsed</span></div><button aria-label={`Open ${order.id}`} onClick={() => toast.info(`${order.id} selected`)}><ChevronRight size={19} /></button></div>)}</div>;
}

function LiveOperations() {
  return <><PageTitle kicker="Restaurant flow" title="Live operations." description="A single view of guests, tables, tickets and the exceptions slowing the room." /><div className="operation-layout"><div className="surface"><div className="surface-heading"><div><p className="section-kicker">Order lifecycle</p><h2>Kitchen flow</h2></div><span className="live-label"><i />Updates every 5s</span></div><div className="kanban">{["New", "Preparing", "Ready"].map((state) => <div className="kanban-column" key={state}><p>{state}<b>{orders.filter((order) => order.status === state).length}</b></p>{orders.filter((order) => order.status === state).map((order) => <article key={order.id}><span>{order.table}</span><b>{order.id}</b><small>{order.items}</small><em>{order.age} elapsed</em></article>)}</div>)}</div></div><div className="surface attention-list"><p className="section-kicker">Action queue</p><h2>Resolve next</h2>{["Maya’s soy substitution", "Table 12 waiting 19 min", "Chicken stock below threshold"].map((item, i) => <button key={item} onClick={() => toast.success("Task assigned to you")}><span className={`priority p${i}`}>{i + 1}</span><span>{item}<small>{i === 0 ? "Safety-critical" : "Needs attention"}</small></span><ChevronRight size={16} /></button>)}</div></div></>;
}

function Inventory() {
  const stock = [["Heritage chicken", "4 portions", 32, "Critical"], ["Wild mushrooms", "1.7 kg", 54, "Watch"], ["Citrus vinaigrette", "12 portions", 78, "Healthy"], ["Miso glaze", "0.9 L", 42, "Watch"]];
  return <><PageTitle kicker="Stock intelligence" title="Your pantry, in context." description="Availability is connected to the menu and alerts the right people before service is affected." action={<button className="primary-button" onClick={() => toast.success("Inventory adjustment opened")}>Adjust inventory <Plus size={17} /></button>} /><div className="inventory-layout"><div className="surface inventory-table"><div className="surface-heading"><div><p className="section-kicker">Ingredient levels</p><h2>Service readiness</h2></div><button className="filter-button">All ingredients <ChevronRight size={15} /></button></div>{stock.map(([item, count, value, state]) => <div className="stock-row" key={item as string}><div className="ingredient-icon">{(item as string).charAt(0)}</div><div><b>{item}</b><small>{count}</small></div><div className="stock-bar"><span><i style={{ width: `${value}%` }} /></span><small>{value}% remaining</small></div><span className={`stock-state ${String(state).toLowerCase()}`}>{state}</span><button onClick={() => toast.success(`${item} is now being reviewed`)}><ChevronRight size={17} /></button></div>)}</div><div className="surface inventory-impact"><p className="section-kicker">Availability impact</p><h2>One stock change,<br />everywhere updated.</h2><div className="impact-flow"><span>Ingredient</span><i /><span>Menu</span><i /><span>Orders</span><i /><span>Staff</span></div><div className="impact-callout"><CircleAlert size={18} /><p><b>Chicken is low.</b> 3 active items and 1 customer order will be watched automatically.</p></div></div></div></>;
}

function MenuStudio() {
  return <><PageTitle kicker="Guest-facing menu" title="Menu studio." description="Make changes once. Restaurant Pulse carries the context to availability, constraints and active orders." action={<button className="primary-button" onClick={() => toast.success("New dish editor opened")}>Add menu item <Plus size={17} /></button>} /><div className="menu-studio-grid">{menu.map((item) => <article className="studio-dish" key={item.id}><div className={`food-art ${item.hue}`}><span>{item.stock}</span></div><div className="studio-body"><div><p>{item.time} prep time</p><h3>{item.name}</h3><span>{item.desc}</span></div><b>${item.price.toFixed(2)}</b></div><footer><span className={item.state === "Review" ? "review" : "available"}>{item.state === "Review" ? "● Needs review" : "● Available"}</span><button onClick={() => toast.info(`${item.name} editor opened`)}>Edit <ChevronRight size={15} /></button></footer></article>)}</div></>;
}

function Insights() {
  return <><PageTitle kicker="Patterns worth knowing" title="Insights with a next step." description="Not vanity metrics: signals that make tomorrow’s service more predictable." /><div className="insight-grid"><div className="surface insight-feature"><div className="sparkle"><Sparkles size={21} /></div><p className="section-kicker">Today’s strongest signal</p><h2>Friday’s 7–8pm surge is creating a 4-minute delay on hearth items.</h2><p>Move one server toward expediting and surface faster compatible alternatives in the guest menu.</p><button onClick={() => toast.success("Recommendation marked as reviewed")}>Mark reviewed <Check size={16} /></button></div><div className="surface trend-list"><p className="section-kicker">Operational trends</p>{[["Stock-outs avoided", "8", "+3 this week"], ["Safety acknowledgements", "100%", "4 orders"], ["Average table turn", "72m", "-6m vs last week"]].map(([label, value, note]) => <div key={label}><span>{label}<small>{note}</small></span><b>{value}</b></div>)}</div></div></>;
}

function KitchenPage({ section }: { section: string }) {
  if (section === "Safety relay") return <SafetyRelay />;
  if (section === "Completed") return <CompletedOrders />;
  return <><PageTitle kicker="Kitchen display" title="The line, made clear." description="Every ticket shows context, elapsed time and the next safe action." action={<span className="kitchen-online"><i />4 stations online</span>} /><div className="kitchen-grid">{orders.filter((order) => order.status !== "Served").map((order) => <article className={`ticket ${order.status === "Attention" ? "ticket-alert" : ""}`} key={order.id}><header><span>{order.table}</span><b>{order.id}</b><em>{order.age}</em></header><div className="ticket-body"><span className={`status ${statusStyles[order.status]}`}>{order.status}</span><h3>{order.guest}</h3><p>{order.items}</p>{order.safety && <div className="ticket-warning"><ShieldCheck size={16} /><span><b>SafePlate check</b>{order.safety}</span></div>}</div><footer><button onClick={() => toast.success(`${order.id} is in preparation`)}>{order.status === "New" ? "Start prep" : "Update"}</button><button className="ticket-primary" onClick={() => toast.success(`${order.id} marked ready`)}>Mark ready</button></footer></article>)}</div></>;
}

function SafetyRelay() {
  return <><PageTitle kicker="Closed-loop safety" title="Keep the right context with the order." description="SafePlate makes each dietary handoff visible, attributable and impossible to silently skip." /><div className="safety-layout"><div className="surface relay-detail"><div className="relay-order"><span className="status status-alert">! Attention</span><h2>#1048 · Maya Chen</h2><p>Table 08 · Miso glazed salmon</p></div><div className="relay-conflict"><CircleAlert size={21} /><div><b>Ingredient conflict detected</b><p>The new miso glaze includes soy, which conflicts with Maya’s saved constraint.</p></div></div><div className="handoff-timeline">{[["Guest preference captured", "Soy allergy saved with this order", true], ["Server acknowledgement", "Required before sending to kitchen", true], ["Kitchen confirmation", "Awaiting chef acknowledgement", false], ["Delivery verification", "Available after preparation", false]].map(([title, description, done], index) => <div key={title as string} className={done ? "done" : "pending"}><span>{done ? <Check size={14} /> : index + 1}</span><div><b>{title}</b><p>{description}</p></div></div>)}</div><button className="primary-button" onClick={() => toast.success("Kitchen acknowledgement recorded")}>Acknowledge as kitchen <ShieldCheck size={17} /></button></div><div className="surface alternative-card"><p className="section-kicker">Safe alternatives</p><h2>Offer one of these instead</h2>{["Heritage chicken", "Citrus garden", "Ember aubergine"].map((item, index) => <button key={item} onClick={() => toast.success(`${item} proposed to Maya`)}><span>{index + 1}</span><b>{item}<small>Compatible · Available now</small></b><ChevronRight size={17} /></button>)}</div></div></>;
}

function CompletedOrders() {
  return <><PageTitle kicker="Kitchen archive" title="A clean, finished service." description="Completed tickets stay searchable for handoff, timing and safety review." /><div className="surface completed-card"><ClipboardCheck size={32} /><h2>48 orders completed tonight</h2><p>Average completion time is 15 minutes, 2 minutes ahead of your target.</p><button className="primary-button" onClick={() => toast.info("Completed order report prepared")}>Open completed report <ArrowUpRight size={16} /></button></div></>;
}

function ServicePage({ section }: { section: string }) {
  if (section === "Tables") return <Tables />;
  if (section === "Waitlist") return <Waitlist />;
  if (section === "Bills") return <Bills />;
  return <><PageTitle kicker="Front of house" title="The room is asking for you." description="A live, quiet checklist of every guest moment that needs a human response." /><div className="service-layout"><div className="surface service-tasks"><div className="surface-heading"><div><p className="section-kicker">Action queue</p><h2>Take the next right action</h2></div><span className="task-total">6 open</span></div>{[["T08", "Resolve soy substitution", "Safety-critical", "red"], ["T11", "Food ready for delivery", "1 minute ago", "amber"], ["T04", "Water requested", "2 minutes ago", "blue"], ["T12", "Bill requested", "4 minutes ago", "purple"]].map(([table, title, sub, color]) => <button className="service-task" key={title} onClick={() => toast.success(`${title} assigned to Alex`)}><span className={`task-circle ${color}`}>{table}</span><span><b>{title}</b><small>{sub}</small></span><ChevronRight size={18} /></button>)}</div><div className="surface room-card"><p className="section-kicker">Room status</p><h2>10 of 14<br />tables seated</h2><div className="table-map">{Array.from({ length: 14 }, (_, index) => <span key={index} className={index < 10 ? (index === 7 ? "needs" : "occupied") : "open"}>T{String(index + 1).padStart(2, "0")}</span>)}</div><p className="map-legend"><i className="occupied" />Seated <i className="needs" />Needs attention <i className="open" />Open</p></div></div></>;
}

function Tables() {
  return <><PageTitle kicker="Floor plan" title="Every table, accounted for." description="Assign guests intelligently, preserve seating context and keep turnover visible." /><div className="surface tables-screen"><div className="floor-grid">{Array.from({ length: 14 }, (_, index) => <button key={index} className={index < 10 ? "occupied" : "open"} onClick={() => toast.info(`Table T${String(index + 1).padStart(2, "0")} opened`)}><b>T{String(index + 1).padStart(2, "0")}</b><small>{index < 10 ? `${[2, 4, 3, 2][index % 4]} guests` : "Available"}</small></button>)}</div><aside><p className="section-kicker">Selected table</p><h2>Table 08</h2><p>Maya Chen · 2 guests · seated 42 min ago</p><button className="primary-button" onClick={() => toast.success("Table 08 service view opened")}>Open table session <ArrowUpRight size={16} /></button></aside></div></>;
}

function Waitlist() {
  return <><PageTitle kicker="Guest queue" title="Waiting feels better with clarity." description="Share a useful estimate, let staff assign with confidence and never lose a party in the shuffle." /><div className="waitlist-grid"><div className="surface waitlist-list">{[["Olivia Turner", "3 guests", "12 min", "First available"], ["The Shahs", "4 guests", "18 min", "Needs booth"], ["Ethan Walker", "2 guests", "25 min", "Anniversary note"]].map(([name, party, wait, note], index) => <div key={name}><span>{index + 1}</span><div><b>{name}</b><small>{party} · {note}</small></div><strong>{wait}</strong><button onClick={() => toast.success(`${name} is ready to seat`)}>Seat</button></div>)}</div><div className="surface wait-explainer"><CalendarClock size={25} /><p className="section-kicker">Explainable estimate</p><h2>18 minutes</h2><p>Based on two parties ahead, 4 compatible seats and a 75-minute dining average.</p></div></div></>;
}

function Bills() {
  return <><PageTitle kicker="Closing the table" title="Billing without the scramble." description="Clear, staff-controlled totals with orders, discounts and receipt status in one place." /><div className="bill-layout"><div className="surface"><p className="section-kicker">Ready to close</p><h2>Table 11 · Ava Patel</h2><div className="bill-lines"><span>Ember aubergine <b>$14.50</b></span><span>Wild mushroom pappardelle <b>$22.00</b></span><span>Tax <b>$3.01</b></span></div><div className="bill-total"><span>Total</span><b>$39.51</b></div><button className="primary-button" onClick={() => toast.success("Payment recorded. Receipt #LU-1046 is ready.")}>Mark as paid <CreditCard size={16} /></button></div><div className="surface receipts"><p className="section-kicker">Tonight’s receipts</p>{["#LU-1045 · $27.06", "#LU-1044 · $61.37", "#LU-1043 · $48.72"].map((receipt) => <button key={receipt} onClick={() => toast.info(`${receipt} opened`)}><span><Check size={15} /></span>{receipt}<ChevronRight size={16} /></button>)}</div></div></>;
}

function GuestPage({ cart, setCart, constraints, setConstraints, queueJoined, setQueueJoined }: { cart: number[]; setCart: (items: number[]) => void; constraints: string[]; setConstraints: (items: string[]) => void; queueJoined: boolean; setQueueJoined: (value: boolean) => void }) {
  const total = useMemo(() => cart.reduce((sum, itemId) => sum + (menu.find((item) => item.id === itemId)?.price ?? 0), 0), [cart]);
  return <><section className="guest-hero"><div><p className="eyebrow">Luma House · Open now</p><h1>Make the evening<br /><i>yours.</i></h1><p>Good food moves better when the menu, kitchen and your table are in sync.</p><div className="guest-actions"><button onClick={() => { setQueueJoined(!queueJoined); toast.success(queueJoined ? "You left the waitlist" : "You’re #3 in line — about 18 minutes"); }}>{queueJoined ? "Leave waitlist" : "Join the waitlist"}<ArrowUpRight size={17} /></button><span><span className="live-dot" />14 tables · 4 open</span></div></div><div className="hero-visual"><div className="hero-plate"><span>Seasonal<br />at Luma</span></div><div className="hero-note"><Leaf size={16} />Thoughtful food,<br />thoughtfully handled.</div></div></section>
    <section className="guest-toolbar"><div><p className="section-kicker">Personalize your menu</p><h2>What can we help you avoid?</h2></div><div className="constraint-chips">{["Soy", "Peanut", "Dairy", "Gluten", "Vegan"].map((item) => <button key={item} onClick={() => setConstraints(constraints.includes(item) ? constraints.filter((x) => x !== item) : [...constraints, item])} className={constraints.includes(item) ? "on" : ""}>{constraints.includes(item) && <Check size={14} />}{item}</button>)}</div></section>
    <section className="guest-menu">{menu.map((item) => { const conflict = constraints.some((constraint) => item.tags.includes(constraint)); const status = conflict ? "Review" : item.state; return <article key={item.id} className="guest-dish"><div className={`food-art ${item.hue}`}><span>{item.stock}</span></div><div className="guest-dish-main"><div><div className="dish-top"><p>{item.time}</p><span className={status === "Review" ? "review" : status === "Modify" ? "modify" : "compatible"}>{status === "Review" ? "! Review" : status === "Modify" ? "◇ Can modify" : "✓ Compatible"}</span></div><h3>{item.name}</h3><p>{item.desc}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="dish-action"><b>${item.price.toFixed(2)}</b><button disabled={status === "Review"} onClick={() => { setCart([...cart, item.id]); toast.success(`${item.name} added to your order`); }}><Plus size={18} />Add</button></div></div></article>; })}</section>
    {cart.length > 0 && <aside className="cart-dock"><div><span>{cart.length} item{cart.length > 1 ? "s" : ""}</span><b>${total.toFixed(2)}</b><small>We’ll reconfirm your dietary context at checkout.</small></div><button onClick={() => { setCart([]); toast.success("Order #1049 placed — the kitchen has it."); }}>Place order <ArrowUpRight size={17} /></button></aside>}
  </>;
}
