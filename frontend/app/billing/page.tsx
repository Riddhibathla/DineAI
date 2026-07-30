"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, CreditCard } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";
import {
  ORDER_STORAGE_KEY,
  SubmittedOrder,
  readStoredList,
} from "@/lib/customer-activity";
import { menu } from "@/lib/demo-data";

export default function BillingPage() {
  const [customerOrders, setCustomerOrders] = useState<SubmittedOrder[]>([]);

  useEffect(() => {
    setCustomerOrders(
      readStoredList<SubmittedOrder>(ORDER_STORAGE_KEY).filter(
        (order) => order.source === "customer",
      ),
    );
  }, []);

  const latestOrder = customerOrders[0];

  return (
    <WorkspaceLayout page="billing">
      <section className="close-layout">
        {latestOrder ? (
          <div className="receipt customer-receipt">
            <p>
              {latestOrder.paymentStatus === "PAID"
                ? "CUSTOMER PAYMENT RECEIVED"
                : "PAYMENT DUE AT COUNTER"}{" "}
              · {latestOrder.id}
            </p>
            <h2>{latestOrder.customerName}</h2>
            {latestOrder.itemIds.map((itemId, index) => {
              const dish = menu.find((item) => item.id === itemId);
              return dish ? (
                <span key={`${itemId}-${index}`}>
                  {dish.name}
                  <b>₹{(dish.priceCents / 100).toFixed(2)}</b>
                </span>
              ) : null;
            })}
            <span>
              {latestOrder.paymentDetail}
              <b>{latestOrder.paymentStatus}</b>
            </span>
            <footer>
              <b>Total</b>
              <strong>₹{(latestOrder.total / 100).toFixed(2)}</strong>
            </footer>
            <button
              onClick={() =>
                toast.success(
                  latestOrder.paymentStatus === "PAID"
                    ? `Receipt ${latestOrder.id} opened`
                    : `Counter payment recorded for ${latestOrder.id}`,
                )
              }
            >
              {latestOrder.paymentStatus === "PAID"
                ? "View receipt"
                : "Mark counter payment paid"}{" "}
              <CreditCard size={16} />
            </button>
          </div>
        ) : (
          <div className="receipt empty-activity">
            <p>CUSTOMER CHECKOUTS</p>
            <h2>No customer payments yet.</h2>
            <span>Orders placed on the guest menu will appear here.</span>
          </div>
        )}
        <div className="receipt-stream">
          <p>CUSTOMER PAYMENT ACTIVITY</p>
          {customerOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => toast.info(`${order.id} opened`)}
            >
              <Check size={15} />
              <span>
                {order.id} · ₹{(order.total / 100).toFixed(2)}
                <small>
                  {order.paymentMethod.replaceAll("_", " ")} ·{" "}
                  {order.paymentStatus}
                </small>
              </span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
