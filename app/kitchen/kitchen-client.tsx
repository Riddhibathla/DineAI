"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { WorkspaceLayout } from "@/components/workspace-layout";
import { updateOrderStatus } from "./actions";

export function KitchenClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);

  const handleAction = async (orderId: string, dbId: string, nextStatus: string) => {
    // Optimistic update
    setOrders((prev) => prev.map(o => o.dbId === dbId ? { ...o, status: nextStatus } : o));
    toast.success(`${orderId} moved to ${nextStatus}`);
    
    // Server action
    try {
      await updateOrderStatus(dbId, nextStatus);
    } catch (e: any) {
      toast.error("Failed to update status");
      // Could revert optimistic update here
    }
  };

  return (
    <WorkspaceLayout page="kitchen">
      <section className="line-board">
        {orders.map((order) => {
          const isAlert = order.status === "REQUIRES_ATTENTION";
          const isPrep = order.status === "PREPARING";
          const isAck = order.status === "ACKNOWLEDGED";
          const isSub = order.status === "SUBMITTED";

          let nextLabel = "Start";
          let nextStatus = "ACKNOWLEDGED";
          
          if (isSub) {
            nextLabel = "Acknowledge";
            nextStatus = "ACKNOWLEDGED";
          } else if (isAck) {
            nextLabel = "Start Prep";
            nextStatus = "PREPARING";
          } else if (isPrep) {
            nextLabel = "Ready";
            nextStatus = "READY";
          } else if (isAlert) {
            nextLabel = "Resolve";
            nextStatus = "PREPARING";
          }

          // If order is ready, we shouldn't show it in the line board unless we want it stuck there
          if (order.status === "READY") return null;

          return (
            <article className={`heat-card ${isAlert ? "alert" : ""}`} key={order.dbId}>
              <header>
                <span>{order.table}</span>
                <b>{order.id}</b>
                <em>{order.elapsed}m</em>
              </header>
              <div>
                <p>{order.status.replaceAll("_", " ")}</p>
                <h3>{order.guest}</h3>
                <small>{order.items.join(" · ")}</small>
                {order.safety && (
                  <aside>
                    <ShieldCheck size={16} />
                    <span><b>SafePlate pause</b>{order.safety}</span>
                  </aside>
                )}
              </div>
              <footer>
                <button onClick={() => handleAction(order.id, order.dbId, nextStatus)}>
                  {nextLabel}
                </button>
              </footer>
            </article>
          );
        })}
      </section>
    </WorkspaceLayout>
  );
}
