"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Sparkles } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";
import {
  BOOKING_STORAGE_KEY,
  ORDER_STORAGE_KEY,
  SeatBooking,
  SubmittedOrder,
  readStoredList,
} from "@/lib/customer-activity";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<SubmittedOrder[]>([]);
  const [bookings, setBookings] = useState<SeatBooking[]>([]);

  useEffect(() => {
    setOrders(
      readStoredList<SubmittedOrder>(ORDER_STORAGE_KEY).filter(
        (order) => order.source === "customer",
      ),
    );
    setBookings(
      readStoredList<SeatBooking>(BOOKING_STORAGE_KEY).filter(
        (booking) => booking.source === "customer",
      ),
    );
  }, []);

  const paidRevenue = useMemo(
    () =>
      orders
        .filter((order) => order.paymentStatus === "PAID")
        .reduce((sum, order) => sum + order.total, 0),
    [orders],
  );
  const counterPayments = orders.filter(
    (order) => order.paymentMethod === "PAY_AT_COUNTER",
  ).length;

  return (
    <WorkspaceLayout page="analytics">
      <section className="signal-field">
        <article className="signal-card main">
          <Sparkles size={24} />
          <p>THE STRONGEST SIGNAL</p>
          <h2>
            The hearth is about to create a four-minute drag between 7:30 and
            8:00pm.
          </h2>
          <span>
            Move one service teammate to expediting and show faster compatible
            alternatives first.
          </span>
          <button onClick={() => toast.success("Signal marked as reviewed")}>
            Mark reviewed <Check size={15} />
          </button>
        </article>
        <article className="signal-card">
          <p>CUSTOMER ORDERS</p>
          <h3>{String(orders.length).padStart(2, "0")}</h3>
          <b>{counterPayments} awaiting counter payment</b>
        </article>
        <article className="signal-card">
          <p>ONLINE REVENUE</p>
          <h3>₹{(paidRevenue / 100).toFixed(0)}</h3>
          <b>Card and UPI payments</b>
        </article>
        <article className="signal-card">
          <p>SEAT REQUESTS</p>
          <h3>{String(bookings.length).padStart(2, "0")}</h3>
          <b>Submitted from the guest menu</b>
        </article>
      </section>
    </WorkspaceLayout>
  );
}
