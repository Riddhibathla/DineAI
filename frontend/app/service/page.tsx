"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { WorkspaceLayout } from "@/components/workspace-layout";
import {
  BOOKING_STORAGE_KEY,
  ORDER_STORAGE_KEY,
  SeatBooking,
  SubmittedOrder,
  readStoredList,
} from "@/lib/customer-activity";

export default function ServicePage() {
  const [bookings, setBookings] = useState<SeatBooking[]>([]);
  const [customerOrders, setCustomerOrders] = useState<SubmittedOrder[]>([]);

  useEffect(() => {
    setBookings(
      readStoredList<SeatBooking>(BOOKING_STORAGE_KEY).filter(
        (booking) => booking.source === "customer",
      ),
    );
    setCustomerOrders(
      readStoredList<SubmittedOrder>(ORDER_STORAGE_KEY).filter(
        (order) => order.source === "customer",
      ),
    );
  }, []);

  const latestBooking = bookings[0];
  const latestOrder = customerOrders[0];
  const customerMoments = [
    ...(latestBooking
      ? [
          [
            "WL",
            `Prepare a seat for ${latestBooking.name}`,
            `${latestBooking.party} guests · ${latestBooking.estimate} min estimate`,
          ],
        ]
      : []),
    ...(latestOrder
      ? [
          [
            "GO",
            `Customer order ${latestOrder.id}`,
            `${latestOrder.paymentStatus === "PAID" ? "Paid" : "Cash due"} · ${latestOrder.customerName}`,
          ],
        ]
      : []),
  ];

  return (
    <WorkspaceLayout page="service">
      <section className="floor-layout">
        <div className="floor-grid">
          {Array.from({ length: 14 }, (_, index) => (
            <button
              key={index}
              className={index === 7 ? "urgent" : index < 10 ? "seated" : "free"}
              onClick={() =>
                toast.info(
                  `Table ${String(index + 1).padStart(2, "0")} selected`,
                )
              }
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>
                {index === 7
                  ? "safety"
                  : index < 10
                    ? `${[2, 3, 4][index % 3]} guests`
                    : "open"}
              </span>
            </button>
          ))}
        </div>
        <div className="service-trail">
          <p>THE NEXT MOMENTS</p>
          {[
            ...customerMoments,
            ["08", "Resolve soy substitution", "Safety-critical"],
            ["11", "Deliver ready dishes", "1 min ago"],
            ["04", "Bring water", "2 min ago"],
          ]
            .slice(0, 5)
            .map(([table, title, note]) => (
              <button
                key={title}
                onClick={() => toast.success(`${title} assigned to you`)}
              >
                <span>
                  {table === "WL" || table === "GO" ? table : `T${table}`}
                </span>
                <b>
                  {title}
                  <small>{note}</small>
                </b>
                <ArrowUpRight size={16} />
              </button>
            ))}
        </div>
      </section>
    </WorkspaceLayout>
  );
}
