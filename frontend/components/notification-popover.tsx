"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check, CircleAlert, CreditCard, Utensils, X } from "lucide-react";
import {
  CUSTOMER_ACTIVITY_EVENT,
  ORDER_STORAGE_KEY,
  SubmittedOrder,
  readStoredList,
} from "@/lib/customer-activity";

type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "alert" | "payment" | "kitchen" | "neutral";
};

const notifications: Notification[] = [
  {
    id: "safety",
    title: "Table 08 needs a gluten-safe substitute",
    detail: "Kitchen acknowledgement is still pending.",
    time: "Just now",
    tone: "alert",
  },
  {
    id: "payment",
    title: "UPI payment received for RP-1050",
    detail: "Billing is ready to issue the receipt.",
    time: "4 min ago",
    tone: "payment",
  },
  {
    id: "seat",
    title: "New guest seat request",
    detail: "A party of 3 is waiting for the next suitable table.",
    time: "8 min ago",
    tone: "neutral",
  },
  {
    id: "kitchen",
    title: "Order RP-1048 is ready for service",
    detail: "Table 11 is ready for collection.",
    time: "12 min ago",
    tone: "kitchen",
  },
  {
    id: "inventory",
    title: "Paneer inventory is running low",
    detail: "Three menu items may need an availability review.",
    time: "18 min ago",
    tone: "alert",
  },
  {
    id: "service",
    title: "Service request from Table 04",
    detail: "Water refill requested by the guest.",
    time: "23 min ago",
    tone: "neutral",
  },
];

const icons = {
  alert: CircleAlert,
  payment: CreditCard,
  kitchen: Utensils,
  neutral: Bell,
};

export function NotificationPopover({ customer = false }: { customer?: boolean }) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(customer ? 0 : 3);
  const [customerOrders, setCustomerOrders] = useState<SubmittedOrder[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customer) return;
    const refreshCustomerOrders = () => {
      const orders = readStoredList<SubmittedOrder>(ORDER_STORAGE_KEY)
        .filter((order) => order.source === "customer")
        .sort((left, right) =>
          (right.createdAt ?? "").localeCompare(left.createdAt ?? ""),
        );
      setCustomerOrders(orders);
      setUnread(orders.filter((order) => order.fulfillmentStatus === "READY").length);
    };

    refreshCustomerOrders();
    window.addEventListener(CUSTOMER_ACTIVITY_EVENT, refreshCustomerOrders);
    const refreshFromAnotherTab = (event: StorageEvent) => {
      if (event.key === ORDER_STORAGE_KEY) refreshCustomerOrders();
    };
    window.addEventListener("storage", refreshFromAnotherTab);
    return () =>
      {
        window.removeEventListener(CUSTOMER_ACTIVITY_EVENT, refreshCustomerOrders);
        window.removeEventListener("storage", refreshFromAnotherTab);
      };
  }, [customer]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", closeOnOutsideClick);
      document.addEventListener("keydown", closeOnEscape);
    }
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const customerNotifications: Notification[] = customerOrders.map((order) => ({
    id: order.id,
    title:
      order.fulfillmentStatus === "READY"
        ? `Your order ${order.id} is ready`
        : order.fulfillmentStatus === "PREPARING"
          ? `Your order ${order.id} is being prepared`
          : `Your order ${order.id} is confirmed`,
    detail:
      order.fulfillmentStatus === "READY"
        ? "Your food is ready for collection or table service."
        : order.fulfillmentStatus === "PREPARING"
          ? "The kitchen has started preparing your dishes."
          : "Your order has been sent to the kitchen.",
    time:
      order.fulfillmentStatus === "READY"
        ? "Ready now"
        : order.fulfillmentStatus === "PREPARING"
          ? "In progress"
          : "Order received",
    tone:
      order.fulfillmentStatus === "READY"
        ? "kitchen"
        : order.fulfillmentStatus === "PREPARING"
          ? "neutral"
          : "payment",
  }));
  const visibleNotifications = customer ? customerNotifications : notifications;

  return (
    <div className="notification-shell" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell size={18} />
        {unread > 0 && <i>{unread}</i>}
      </button>
      {open && (
        <section
          className="notification-popover"
          role="dialog"
          aria-label="Notifications"
        >
          <header>
            <div>
              <p>{customer ? "YOUR ORDER UPDATES" : "NOTIFICATIONS"}</p>
              <h2>
                {customer ? "Your dining updates" : "Everything needing attention"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close notifications"
            >
              <X size={17} />
            </button>
          </header>
          <div className="notification-list">
            {visibleNotifications.length === 0 ? (
              <div className="notification-empty">
                <Bell size={18} />
                <b>No order updates yet</b>
                <small>We will let you know as soon as the kitchen starts or finishes your order.</small>
              </div>
            ) : visibleNotifications.map((notification, index) => {
              const Icon = icons[notification.tone];
              return (
                <article key={notification.id}>
                  <span className={`notification-icon ${notification.tone}`}>
                    <Icon size={16} />
                  </span>
                  <div>
                    <b>{notification.title}</b>
                    <small>{notification.detail}</small>
                    <time>{notification.time}</time>
                  </div>
                  {(customer
                    ? notification.time === "Ready now"
                    : index < unread) && <em aria-label="Unread notification" />}
                </article>
              );
            })}
          </div>
          <footer>
            <button
              type="button"
              onClick={() => setUnread(0)}
              disabled={unread === 0}
            >
              <Check size={15} /> Mark all as read
            </button>
          </footer>
        </section>
      )}
    </div>
  );
}
