"use client";

import { toast } from "sonner";
import { ArrowUpRight, Leaf } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";
import { inventory } from "@/lib/demo-data"; // We can keep demo data for the UI showcase, or wire it

export default function InventoryPage() {
  return (
    <WorkspaceLayout page="inventory">
      <section className="pantry-map">
        <div className="ingredient-axis">
          {inventory.map((item) => (
            <article key={item.name}>
              <span>{item.name.charAt(0)}</span>
              <div>
                <b>{item.name}</b>
                <small>{item.remaining} {item.unit} remaining</small>
              </div>
              <div className="supply-line">
                <i style={{ width: `${item.percent}%` }} />
              </div>
              <em className={item.state.toLowerCase()}>{item.state}</em>
              <button onClick={() => toast.info(`${item.name} adjustment opened`)}>
                <ArrowUpRight size={16} />
              </button>
            </article>
          ))}
        </div>
        <aside>
          <Leaf size={26} />
          <p>LIVE IMPACT</p>
          <h2>Ingredient changes ripple through menu and orders automatically.</h2>
          <span>Chicken is low → 3 menu items watched → 1 active order monitored</span>
        </aside>
      </section>
    </WorkspaceLayout>
  );
}
