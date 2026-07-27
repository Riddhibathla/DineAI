"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";

import { submitGuestOrder } from "./actions";

export function GuestClient({ menu, restaurant }: { menu: any[]; restaurant: any }) {
  const [cart, setCart] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(() => cart.reduce((sum, id) => sum + (menu.find((item) => item.id === id)?.priceCents ?? 0), 0), [cart, menu]);

  const table = false; // Guest view is unauthenticated, table session will be true

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitGuestOrder(cart, constraints);
      toast.success(`Order ${res.orderId} sent to kitchen!`);
      setCart([]);
    } catch (e) {
      toast.error("Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WorkspaceLayout page="guest">
      <section className="guest-signal">
        <div className="signal-copy">
          <span>{table ? "TABLE 08 / YOUR LIVE SESSION" : "LUMA HOUSE IS SERVING NOW"}</span>
          <h2>{table ? "Your table is already in rhythm." : "A menu that knows the moment."}</h2>
          <p>{table ? "Two guests · Server Sam is nearby · Your order can carry every preference." : `${restaurant.activeTables} tables are in motion. ${restaurant.totalTables - restaurant.activeTables} are open right now.`}</p>
          <button onClick={() => toast.success(table ? "Service request sent" : "You’re #3 in line — 18 minutes")}>
            {table ? "Request service" : "Join the waitlist"}
            <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="signal-orbit">
          <b>18<span>min</span></b>
          <small>Current wait</small>
          <i className="ring one" />
          <i className="ring two" />
          <em>●</em>
        </div>
      </section>

      <section className="preference-strip">
        <div>
          <p>YOUR PREFERENCES</p>
          <h3>We’ll keep these visible through every handoff.</h3>
        </div>
        <div>
          {["Soy", "Peanut", "Dairy", "Gluten", "Vegan"].map((item) => (
            <button 
              key={item} 
              className={constraints.includes(item) ? "chosen" : ""} 
              onClick={() => setConstraints(constraints.includes(item) ? constraints.filter((x) => x !== item) : [...constraints, item])}
            >
              {constraints.includes(item) && <Check size={13} />}
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="dish-field">
        {menu.map((dish, index) => { 
          const conflict = constraints.some((constraint) => dish.tags.includes(constraint)); 
          const disabled = conflict; 
          return (
            <article className={`dish-cell cell-${index + 1}`} key={dish.id}>
              <div 
                className={`dish-visual ${dish.image.startsWith('http') ? '' : dish.image}`}
                style={dish.image.startsWith('http') ? { backgroundImage: `url(${dish.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <span>{dish.prepMinutes} min</span>
              </div>
              <div className="dish-copy">
                <div>
                  <p>{dish.availability === "AVAILABLE" ? "● Available now" : dish.availability === "REVIEW" ? "! Ask before ordering" : "○ Can modify"}</p>
                  <h3>{dish.name}</h3>
                  <small>{dish.description}</small>
                </div>
                <div className="dish-footer">
                  <b>${(dish.priceCents / 100).toFixed(2)}</b>
                  <button disabled={disabled} onClick={() => { setCart([...cart, dish.id]); toast.success(`${dish.name} added`); }}>
                    <Plus size={16} />{disabled ? "Review" : "Add"}
                  </button>
                </div>
              </div>
            </article>
          ); 
        })}
      </section>

      {cart.length > 0 && (
        <aside className="order-orb">
          <div>
            <span>{cart.length} selection{cart.length > 1 ? "s" : ""}</span>
            <b>${(total / 100).toFixed(2)}</b>
            <small>Dietary context checked at checkout</small>
          </div>
          <button disabled={isSubmitting} onClick={handleCheckout}>
            {isSubmitting ? "Sending..." : "Checkout"} <ArrowUpRight size={17} />
          </button>
        </aside>
      )}
    </WorkspaceLayout>
  );
}
