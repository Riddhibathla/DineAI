"use client";

import { useState } from "react";
import { Check, ChefHat, MessageSquareText, ShieldAlert, Star, Timer, Truck } from "lucide-react";
import { toast } from "sonner";

type OrderState = "New" | "Preparing" | "Ready" | "Delivered";
const initialOrders = [
  { id: "DA-208", guest: "Maya · Table 08", items: "Miso salmon, Citrus garden", note: "Soy allergy · sauce separate", state: "New" as OrderState },
  { id: "DA-209", guest: "Ava · Take away", items: "Wild mushroom pasta", note: "Birthday note requested", state: "Preparing" as OrderState },
  { id: "DA-210", guest: "Noah · Table 03", items: "Hearth chicken × 2", note: "Wheelchair access: aisle table", state: "Ready" as OrderState },
];

export function ServerBoard() {
  const [orders, setOrders] = useState(initialOrders);
  const advance = (id: string) => setOrders((items) => items.map((order) => order.id === id ? { ...order, state: order.state === "New" ? "Preparing" : order.state === "Preparing" ? "Ready" : "Delivered" } : order));
  return <section className="role-workflow"><header><div><p>SERVER CONSOLE</p><h2>Keep every guest in the loop.</h2></div><span><Timer size={15} /> 3 live orders</span></header><div className="server-orders">{orders.map((order) => <article key={order.id}><div className={`status-dot ${order.state.toLowerCase()}`} /><div><p>{order.id} · {order.state}</p><h3>{order.guest}</h3><small>{order.items}</small><em><ShieldAlert size={13} /> {order.note}</em></div><button onClick={() => { advance(order.id); toast.success(`${order.id} moved forward`); }}>{order.state === "New" ? "Start preparing" : order.state === "Preparing" ? "Mark ready" : order.state === "Ready" ? "Mark delivered" : "Delivered"}{order.state !== "Delivered" && <Truck size={15} />}</button></article>)}</div></section>;
}

export function ChefFulfilment() {
  const [comments, setComments] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});
  return <section className="role-workflow chef-workflow"><header><div><p>CHEF CONSOLE</p><h2>Confirm the promise on every plate.</h2></div><span><ChefHat size={15} /> Kitchen line</span></header><div className="chef-orders">{initialOrders.slice(0, 2).map((order) => <article key={order.id}><div><p>{order.id} · {order.guest}</p><h3>{order.items}</h3><b><ShieldAlert size={14} /> {order.note}</b></div><textarea value={comments[order.id] ?? ""} onChange={(event) => setComments({ ...comments, [order.id]: event.target.value })} placeholder="Chef note: confirm how the request was fulfilled…" /><button className={done[order.id] ? "complete" : ""} onClick={() => { setDone({ ...done, [order.id]: true }); toast.success("Fulfilment note saved for the service team"); }}><Check size={15} /> {done[order.id] ? "Fulfilment confirmed" : "Confirm needs fulfilled"}</button></article>)}</div></section>;
}

export function ManagerOverview() {
  const [feedback, setFeedback] = useState(["Food was amazing — the allergy check made us feel safe.", "Quick service, but the pasta arrived warm.", "Loved the accessible table and birthday note."]);
  return <section className="role-workflow manager-workflow"><header><div><p>MANAGER CONSOLE</p><h2>Orders, voices, and the next move.</h2></div><span><Star size={15} /> 4.8 guest rating</span></header><div className="manager-grid"><article><p>LIVE ORDERS</p><strong>18</strong><small>6 preparing · 4 ready · 8 seated</small></article><article><p>SAFE HANDOFFS</p><strong>100%</strong><small>All declared needs acknowledged</small></article><article className="feedback-card"><p><MessageSquareText size={14} /> GUEST FEEDBACK</p>{feedback.map((item) => <button key={item} onClick={() => setFeedback(feedback.filter((entry) => entry !== item))}>{item}<Check size={14} /></button>)}</article></div></section>;
}
