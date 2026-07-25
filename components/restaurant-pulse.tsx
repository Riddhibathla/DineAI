"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

type Role = "Guest" | "Service" | "Kitchen" | "Manager";
type OrderState = "New" | "Acknowledged" | "Preparing" | "Ready" | "Served" | "Attention";

const menu = [
  { id: 1, name: "Fire-roasted aubergine", category: "Small plates", price: 1450, time: 12, tags: ["Vegan", "Gluten-free"], status: "Safe", note: "Tahini, pomegranate, garden herbs", stock: 8 },
  { id: 2, name: "Miso glazed salmon", category: "From the hearth", price: 2650, time: 18, tags: ["Contains soy", "Fish"], status: "Conflict", note: "Forbidden rice, charred greens", stock: 5 },
  { id: 3, name: "Wild mushroom pappardelle", category: "House pasta", price: 2200, time: 16, tags: ["Vegetarian", "Contains gluten"], status: "Modifiable", note: "Brown butter, parmesan, thyme", stock: 7 },
  { id: 4, name: "Citrus garden salad", category: "Small plates", price: 1250, time: 8, tags: ["Vegan", "Gluten-free"], status: "Safe", note: "Fennel, orange, toasted seeds", stock: 12 },
  { id: 5, name: "Heritage chicken", category: "From the hearth", price: 2800, time: 22, tags: ["Gluten-free"], status: "Safe", note: "Spring peas, jus, preserved lemon", stock: 4 },
  { id: 6, name: "Olive oil cake", category: "Dessert", price: 1050, time: 7, tags: ["Contains egg", "Contains gluten"], status: "Safe", note: "Mascarpone, burnt honey", stock: 6 },
];

const seededOrders = [
  { id: "RP-1048", table: "T08", guest: "Maya Chen", items: "Salmon × 1, garden salad × 1", state: "Attention" as OrderState, elapsed: 14, risk: "Soy allergy — sauce conflict", total: 3900 },
  { id: "RP-1047", table: "T03", guest: "Noah Williams", items: "Chicken × 2", state: "Preparing" as OrderState, elapsed: 11, risk: "", total: 5600 },
  { id: "RP-1046", table: "T11", guest: "Ava Patel", items: "Aubergine × 1, pasta × 1", state: "Ready" as OrderState, elapsed: 19, risk: "Gluten preference acknowledged", total: 3650 },
  { id: "RP-1045", table: "T05", guest: "Liam Jones", items: "Garden salad × 2", state: "New" as OrderState, elapsed: 3, risk: "", total: 2500 },
];

const nav: Record<Role, string[]> = {
  Guest: ["Discover", "My order", "Join queue"],
  Service: ["Service board", "Tables", "Queue"],
  Kitchen: ["Kitchen display", "Safety relay", "Completed"],
  Manager: ["Pulse overview", "Inventory", "Menu control", "Insights"],
};

const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export function RestaurantPulse() {
  const [role, setRole] = useState<Role>("Manager");
  const [active, setActive] = useState(nav.Manager[0]);
  const [orders, setOrders] = useState(seededOrders);
  const [constraints, setConstraints] = useState<string[]>(["Soy"]);
  const [cart, setCart] = useState<number[]>([]);
  const [queued, setQueued] = useState(false);

  function switchRole(next: Role) {
    setRole(next);
    setActive(nav[next][0]);
  }

  function transition(id: string, state: OrderState) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, state } : order));
    toast.success(`${id} moved to ${state}`);
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[rgba(255,253,248,.88)] backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1480px] mx-auto px-5 h-18 flex items-center gap-6">
          <button onClick={() => switchRole("Guest")} className="flex items-center gap-3 mr-auto" aria-label="Restaurant Pulse home">
            <span className="w-9 h-9 rounded-full bg-[var(--sage)] text-white grid place-items-center font-bold">P</span>
            <span><b className="display text-xl block leading-none">Restaurant Pulse</b><small className="text-[var(--muted)]">Luma House • Open until 11</small></span>
          </button>
          <div className="hidden md:flex items-center bg-[#ebe5d9] rounded-full p-1" aria-label="Demo role">
            {(["Guest", "Service", "Kitchen", "Manager"] as Role[]).map((item) => (
              <button key={item} onClick={() => switchRole(item)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${role === item ? "bg-white shadow-sm text-[var(--sage)]" : "text-[var(--muted)]"}`}>{item}</button>
            ))}
          </div>
          <button className="w-10 h-10 rounded-full border border-[var(--line)] bg-white relative" aria-label="Notifications">◎<span className="absolute -right-1 -top-1 bg-[var(--coral)] text-white text-[10px] rounded-full min-w-4 h-4">3</span></button>
          <div className="hidden sm:block text-right"><b className="text-sm">Alex Morgan</b><small className="block text-[var(--muted)]">{role} demo</small></div>
        </div>
        <div className="max-w-[1480px] mx-auto px-5 flex gap-2 overflow-auto pb-3 md:hidden">
          {(["Guest", "Service", "Kitchen", "Manager"] as Role[]).map((item) => <button key={item} onClick={() => switchRole(item)} className={`pill whitespace-nowrap ${role === item ? "bg-[var(--sage)] text-white" : "bg-white"}`}>{item}</button>)}
        </div>
      </header>

      <div className="max-w-[1480px] mx-auto px-5 py-7 grid lg:grid-cols-[220px_1fr] gap-7">
        <aside className="hidden lg:block">
          <p className="text-xs tracking-[.18em] uppercase text-[var(--muted)] mb-3 px-3">{role} workspace</p>
          <nav className="space-y-1">{nav[role].map((item, index) => <button key={item} onClick={() => setActive(item)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold ${active === item ? "bg-[var(--sage)] text-white" : "hover:bg-white"}`}><span className="mr-3 opacity-70">0{index + 1}</span>{item}</button>)}</nav>
          <div className="card mt-7 p-4 bg-[var(--sage-soft)]">
            <div className="flex gap-2 items-center"><span className="w-2 h-2 rounded-full bg-green-600" /><b className="text-sm">All systems live</b></div>
            <p className="text-xs text-[var(--muted)] mt-2">Last sync 8 seconds ago</p>
          </div>
        </aside>

        <main>
          {role === "Manager" && <ManagerView orders={orders} transition={transition} />}
          {role === "Kitchen" && <KitchenView orders={orders} transition={transition} />}
          {role === "Service" && <ServiceView orders={orders} transition={transition} queued={queued} />}
          {role === "Guest" && <GuestView cart={cart} setCart={setCart} constraints={constraints} setConstraints={setConstraints} queued={queued} setQueued={setQueued} />}
        </main>
      </div>
      <footer className="max-w-[1480px] mx-auto px-5 py-7 border-t border-[var(--line)] text-xs text-[var(--muted)] flex flex-wrap justify-between gap-3">
        <span>© 2026 Restaurant Pulse • Operational decision support</span>
        <span>SafePlate supports communication; it cannot guarantee absence of allergens or cross-contact.</span>
      </footer>
    </div>
  );
}

function Heading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="mb-7"><p className="text-xs font-bold tracking-[.18em] uppercase text-[var(--coral)] mb-2">{eyebrow}</p><h1 className="display text-4xl md:text-5xl leading-tight">{title}</h1><p className="text-[var(--muted)] mt-2 max-w-2xl">{copy}</p></div>;
}

function ManagerView({ orders, transition }: { orders: typeof seededOrders; transition: (id: string, state: OrderState) => void }) {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  return <>
    <Heading eyebrow="Friday • Dinner service" title="The room, at a glance." copy="Live signals from the floor, kitchen and pantry — focused on what needs action now." />
    <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {[["Revenue", money(revenue), "↑ 12.4% vs last Friday"], ["Dining room", "10 / 14", "71% occupied"], ["Kitchen pace", "16 min", "2 min faster"], ["Needs attention", "3", "1 safety-critical"]].map(([label, value, note], i) => <div className="card p-5 shadow-soft" key={label}><p className="text-sm text-[var(--muted)]">{label}</p><p className={`display text-3xl mt-2 ${i === 3 ? "text-[var(--danger)]" : ""}`}>{value}</p><p className="text-xs mt-2 text-[var(--muted)]">{note}</p></div>)}
    </section>
    <section className="grid xl:grid-cols-[1.3fr_.7fr] gap-5">
      <div className="card p-5"><div className="flex justify-between items-center mb-5"><div><h2 className="display text-2xl">Service pulse</h2><p className="text-sm text-[var(--muted)]">Live orders by urgency</p></div><span className="pill bg-[var(--sage-soft)] text-[var(--sage)]">Live</span></div><OrderTable orders={orders} transition={transition} /></div>
      <div className="space-y-5">
        <div className="card p-5 bg-[#243d32] text-white"><p className="text-xs uppercase tracking-[.16em] text-[#b9d7c7]">SafePlate alert</p><h3 className="display text-2xl mt-2">Sauce substitution affects RP-1048</h3><p className="text-sm text-[#d5e3dc] my-3">New miso glaze contains soy. The order is paused until Maya and the kitchen confirm an alternative.</p><button onClick={() => transition("RP-1048", "Acknowledged")} className="bg-white text-[var(--sage)] px-4 py-2.5 rounded-xl font-bold text-sm">Open resolution</button></div>
        <div className="card p-5"><h3 className="display text-xl">Pantry watch</h3>{[["Heritage chicken", "4 portions", 34], ["Wild mushrooms", "7 portions", 58], ["Citrus vinaigrette", "12 portions", 82]].map(([name, quantity, width]) => <div key={name as string} className="mt-4"><div className="flex justify-between text-sm"><span>{name}</span><b>{quantity}</b></div><div className="h-1.5 bg-[#ece6da] rounded-full mt-2"><div className="h-full bg-[var(--gold)] rounded-full" style={{ width: `${width}%` }} /></div></div>)}</div>
      </div>
    </section>
  </>;
}

function OrderTable({ orders, transition }: { orders: typeof seededOrders; transition: (id: string, state: OrderState) => void }) {
  return <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-[var(--muted)] border-b border-[var(--line)]"><th className="pb-3 font-medium">Order</th><th className="pb-3 font-medium">Guest</th><th className="pb-3 font-medium">State</th><th className="pb-3 font-medium">Time</th><th className="pb-3 font-medium">Action</th></tr></thead><tbody>{orders.map((o) => <tr key={o.id} className="border-b border-[var(--line)] last:border-0"><td className="py-4"><b>{o.id}</b><span className="block text-xs text-[var(--muted)]">{o.table}</span></td><td className="py-4">{o.guest}<span className="block max-w-[230px] truncate text-xs text-[var(--muted)]">{o.risk || o.items}</span></td><td className="py-4"><Status state={o.state} /></td><td className="py-4">{o.elapsed}m</td><td className="py-4"><button onClick={() => transition(o.id, o.state === "Ready" ? "Served" : "Acknowledged")} className="text-[var(--sage)] font-bold hover:underline">{o.state === "Ready" ? "Serve" : "Review"}</button></td></tr>)}</tbody></table></div>;
}

function Status({ state }: { state: OrderState }) {
  const classes = state === "Attention" ? "bg-red-100 text-red-800" : state === "Ready" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900";
  return <span className={`pill ${classes}`}>{state === "Attention" ? "⚠ " : ""}{state}</span>;
}

function KitchenView({ orders, transition }: { orders: typeof seededOrders; transition: (id: string, state: OrderState) => void }) {
  return <><Heading eyebrow="Kitchen display" title="A calm line cooks faster." copy="Tickets are prioritized by elapsed time, safety needs and next best action." /><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{orders.filter(o => o.state !== "Served").map(o => <article key={o.id} className={`card overflow-hidden shadow-soft ${o.state === "Attention" ? "border-red-400" : ""}`}><div className={`p-4 flex justify-between ${o.state === "Attention" ? "bg-red-50" : "bg-[#f0eadf]"}`}><div><b>{o.id}</b><span className="ml-2 text-[var(--muted)]">{o.table}</span></div><b>{o.elapsed} min</b></div><div className="p-5"><Status state={o.state} /><h3 className="font-bold mt-4">{o.guest}</h3><p className="text-sm text-[var(--muted)] mt-1">{o.items}</p>{o.risk && <div className="mt-4 p-3 rounded-xl bg-[#fff1ed] text-sm text-[var(--danger)]"><b>SafePlate relay</b><p className="mt-1">{o.risk}</p></div>}<div className="grid grid-cols-2 gap-2 mt-5"><button onClick={() => transition(o.id, "Preparing")} className="border border-[var(--line)] rounded-xl py-2.5 font-bold text-sm">Start prep</button><button onClick={() => transition(o.id, "Ready")} className="bg-[var(--sage)] text-white rounded-xl py-2.5 font-bold text-sm">Mark ready</button></div></div></article>)}</div></>;
}

function ServiceView({ orders, transition, queued }: { orders: typeof seededOrders; transition: (id: string, state: OrderState) => void; queued: boolean }) {
  const tasks = [["Table 04", "Water requested", "2m", "Normal"], ["Table 08", "Resolve SafePlate conflict", "4m", "Urgent"], ["Table 11", "Order ready for delivery", "1m", "High"], ...(queued ? [["Queue", "Party of 3 waiting", "Now", "High"]] : [])];
  return <><Heading eyebrow="Service board" title="Know what the room needs next." copy="Every open task has an urgency, owner and clear next action." /><section className="grid xl:grid-cols-[.9fr_1.1fr] gap-5"><div className="card p-5"><h2 className="display text-2xl mb-4">Open tasks</h2>{tasks.map(([place, task, age, priority]) => <div key={place + task} className="py-4 border-b border-[var(--line)] last:border-0 flex gap-3 items-center"><span className={`w-2.5 h-2.5 rounded-full ${priority === "Urgent" ? "bg-red-600" : priority === "High" ? "bg-amber-500" : "bg-green-600"}`} /><div className="mr-auto"><b className="text-sm">{task}</b><p className="text-xs text-[var(--muted)]">{place} • {priority}</p></div><small>{age}</small><button onClick={() => toast.success("Task acknowledged")} className="px-3 py-2 rounded-lg bg-[var(--sage-soft)] text-[var(--sage)] font-bold text-xs">Take</button></div>)}</div><div className="card p-5"><h2 className="display text-2xl mb-4">Ready & active orders</h2><OrderTable orders={orders} transition={transition} /></div></section></>;
}

function GuestView({ cart, setCart, constraints, setConstraints, queued, setQueued }: { cart: number[]; setCart: (v: number[]) => void; constraints: string[]; setConstraints: (v: string[]) => void; queued: boolean; setQueued: (v: boolean) => void }) {
  const total = useMemo(() => cart.reduce((sum, id) => sum + (menu.find(x => x.id === id)?.price || 0), 0), [cart]);
  return <><div className="rounded-[28px] bg-[#203a2e] text-white p-7 md:p-10 mb-6 relative overflow-hidden dot-grid"><p className="text-xs uppercase tracking-[.18em] text-[#c5ddce]">Welcome to Luma House</p><h1 className="display text-4xl md:text-6xl max-w-2xl mt-3">Dinner that keeps everyone in the loop.</h1><p className="text-[#d7e5dd] mt-4 max-w-xl">Live dishes, honest wait times and dietary context that follows your order all the way to the pass.</p><div className="flex gap-3 mt-6 flex-wrap"><button onClick={() => { setQueued(!queued); toast.success(queued ? "You left the queue" : "You're in the queue — about 18 min"); }} className="bg-white text-[var(--sage)] px-5 py-3 rounded-xl font-bold">{queued ? "Leave queue" : "Join table queue"}</button><span className="px-5 py-3 rounded-xl border border-white/25">14 tables • 18 min estimate</span></div></div>
    <div className="flex flex-wrap gap-2 mb-5 items-center"><b className="mr-2 text-sm">My needs:</b>{["Soy", "Peanut", "Dairy", "Gluten", "Vegan"].map(c => <button key={c} onClick={() => setConstraints(constraints.includes(c) ? constraints.filter(x => x !== c) : [...constraints, c])} className={`pill border ${constraints.includes(c) ? "bg-[var(--sage)] text-white border-[var(--sage)]" : "bg-white border-[var(--line)]"}`}>{constraints.includes(c) ? "✓ " : ""}{c}</button>)}<span className="text-xs text-[var(--muted)]">Tap to update compatibility</span></div>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{menu.map(item => { const conflicting = constraints.some(c => item.tags.join(" ").toLowerCase().includes(c.toLowerCase()) && item.tags.some(t => t.startsWith("Contains"))); const state = conflicting ? "Conflict" : item.status; return <article key={item.id} className="card p-5 shadow-soft flex flex-col"><div className="h-28 rounded-2xl bg-gradient-to-br from-[#d7c7a4] via-[#f1ddbd] to-[#9cac89] mb-4 relative"><span className="absolute right-3 top-3 pill bg-white/90">{item.stock} left</span></div><div className="flex justify-between gap-4"><div><p className="text-xs text-[var(--coral)] font-bold uppercase tracking-wider">{item.category}</p><h3 className="display text-xl mt-1">{item.name}</h3></div><b>{money(item.price)}</b></div><p className="text-sm text-[var(--muted)] mt-2">{item.note}</p><div className="flex flex-wrap gap-1.5 my-4">{item.tags.map(t => <span key={t} className="pill bg-[#eee8dc]">{t}</span>)}</div><div className={`rounded-xl p-3 text-xs mb-4 ${state === "Conflict" ? "bg-red-50 text-red-800" : state === "Modifiable" ? "bg-amber-50 text-amber-900" : "bg-green-50 text-green-800"}`}><b>{state === "Conflict" ? "⚠ Incompatible" : state === "Modifiable" ? "◇ Modifiable" : "✓ Compatible"}</b><span className="block mt-1">{state === "Conflict" ? `Contains a selected dietary constraint. Ask staff before ordering.` : `${item.time} min estimate • Ingredient record checked`}</span></div><button disabled={state === "Conflict"} onClick={() => { setCart([...cart, item.id]); toast.success(`${item.name} added`); }} className="mt-auto bg-[var(--sage)] disabled:bg-stone-300 text-white py-3 rounded-xl font-bold">Add to order</button></article>})}</div>
    {cart.length > 0 && <div className="sticky bottom-4 mt-5 card shadow-soft p-4 flex items-center gap-4 border-[var(--sage)]"><div className="mr-auto"><b>{cart.length} item{cart.length > 1 ? "s" : ""}</b><span className="block text-xs text-[var(--muted)]">Compatibility will be rechecked at checkout</span></div><b>{money(total)}</b><button onClick={() => { toast.success("Order RP-1049 placed and sent to kitchen"); setCart([]); }} className="bg-[var(--coral)] text-white px-5 py-3 rounded-xl font-bold">Place order</button></div>}
  </>;
}
