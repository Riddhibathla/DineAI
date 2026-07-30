"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Check,
  ChefHat,
  CircleAlert,
  CreditCard,
  Leaf,
  LogIn,
  Menu,
  Plus,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Table2,
  UsersRound,
  X,
} from "lucide-react";
import { inventory, menu, orders, queue, restaurant } from "@/lib/demo-data";

type Page =
  | "guest"
  | "queue"
  | "service"
  | "kitchen"
  | "inventory"
  | "safety"
  | "analytics"
  | "billing"
  | "table";
type PaymentStatus = "PAY_AT_COUNTER" | "PAID_CASH" | "NOT_REQUIRED";
type SubmittedOrder = {
  id: string;
  customerName: string;
  table: string;
  notes: string;
  paymentStatus: PaymentStatus;
  itemIds: string[];
  total: number;
};
type WaitlistCustomer = {
  id: string;
  name: string;
  party: number;
  estimate: number;
};

const links: Array<{ href: string; label: string; icon: typeof ScanLine }> = [
  { href: "/server-ordering", label: "Guest menu", icon: ScanLine },
  { href: "/queue", label: "Waitlist", icon: UsersRound },
  { href: "/service", label: "Service floor", icon: Table2 },
  { href: "/kitchen", label: "Kitchen line", icon: ChefHat },
  { href: "/inventory", label: "Pantry", icon: Leaf },
  { href: "/safety", label: "SafePlate", icon: ShieldCheck },
  { href: "/analytics", label: "Signals", icon: Sparkles },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

const meta: Record<Page, { lens: string; title: string; description: string }> =
  {
    guest: {
      lens: "Server lens",
      title: "Take the order with confidence.",
      description:
        "Capture each dish, customer request and payment choice before sending it to the kitchen.",
    },
    queue: {
      lens: "Arrival lens",
      title: "Waiting, made visible.",
      description:
        "Every party gets a useful estimate and staff sees the best next table.",
    },
    service: {
      lens: "Floor lens",
      title: "Feel the room, not the scramble.",
      description: "The guest moments that need a person, arranged by urgency.",
    },
    kitchen: {
      lens: "Kitchen lens",
      title: "A quieter way to run the line.",
      description:
        "Tickets hold their timing, safety context and next action in one place.",
    },
    inventory: {
      lens: "Pantry lens",
      title: "See the ingredient ripple.",
      description:
        "Stock changes become useful decisions before they become guest disappointments.",
    },
    safety: {
      lens: "SafePlate lens",
      title: "Context should never get lost.",
      description:
        "A visible safety relay from the guest's choice to the final handoff.",
    },
    analytics: {
      lens: "Signal lens",
      title: "Patterns that tell you what to do.",
      description:
        "Operational intelligence with an action attached to every insight.",
    },
    billing: {
      lens: "Close lens",
      title: "Close the table with grace.",
      description:
        "Orders, discounts and payment status stay clear until the final receipt.",
    },
    table: {
      lens: "Table session",
      title: "Welcome to table 08.",
      description:
        "Your menu, dietary notes, order and service requests live right here.",
    },
  };

export function Workspace({
  page,
  variant = "customer",
}: {
  page: Page;
  variant?: "customer" | "server";
}) {
  const isServerOrdering = page === "guest" && variant === "server";
  const [cart, setCart] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [submittedOrders, setSubmittedOrders] = useState<SubmittedOrder[]>(
    () => {
      if (typeof window === "undefined") return [];
      const saved = window.localStorage.getItem("dineai-server-orders");
      return saved ? (JSON.parse(saved) as SubmittedOrder[]) : [];
    },
  );
  const [waitlistCustomers, setWaitlistCustomers] = useState<
    WaitlistCustomer[]
  >(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("dineai-waitlist");
    return saved ? (JSON.parse(saved) as WaitlistCustomer[]) : [];
  });
  const saveOrder = (order: SubmittedOrder) => {
    const updated = [order, ...submittedOrders];
    setSubmittedOrders(updated);
    window.localStorage.setItem(
      "dineai-server-orders",
      JSON.stringify(updated),
    );
  };
  const addWaitlistCustomer = (customer: WaitlistCustomer) => {
    const updated = [...waitlistCustomers, customer];
    setWaitlistCustomers(updated);
    window.localStorage.setItem("dineai-waitlist", JSON.stringify(updated));
  };
  const content =
    page === "guest" || page === "table" ? (
      <Guest
        cart={cart}
        setCart={setCart}
        constraints={constraints}
        setConstraints={setConstraints}
        table={page === "table"}
        onSubmit={saveOrder}
        nextOrderNumber={1050 + submittedOrders.length}
        onAddToWaitlist={addWaitlistCustomer}
        waitlistPosition={queue.length + waitlistCustomers.length + 1}
        serverMode={isServerOrdering}
      />
    ) : page === "queue" ? (
      <Queue addedCustomers={waitlistCustomers} />
    ) : page === "service" ? (
      <Service />
    ) : page === "kitchen" ? (
      <Kitchen submittedOrders={submittedOrders} />
    ) : page === "inventory" ? (
      <Inventory />
    ) : page === "safety" ? (
      <Safety />
    ) : page === "analytics" ? (
      <Analytics
        submittedOrders={submittedOrders}
        waitlistCustomers={waitlistCustomers}
      />
    ) : (
      <Billing submittedOrders={submittedOrders} />
    );
  return (
    <div className="constellation">
      <header className="constellation-top">
        <Link href="/" className="pulse-logo">
          <span>D</span>
          <b>
            DINE
            <br />
            AI
          </b>
        </Link>
        {(page !== "guest" && page !== "table") || isServerOrdering ? (
          <nav className={drawer ? "nav-open" : ""}>
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={
                  (isServerOrdering && href === "/server-ordering") ||
                  page === href.slice(1)
                    ? "current"
                    : ""
                }
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
        ) : null}
        <div className="top-tools">
          {(page === "guest" || page === "table") && !isServerOrdering ? (
            <Link className="account-link" href="/auth" aria-label="Sign in">
              <LogIn size={17} />
            </Link>
          ) : (
            <>
              <button
                onClick={() => toast.info("3 operational updates")}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <i>3</i>
              </button>
              <button
                className="nav-toggle"
                onClick={() => setDrawer(!drawer)}
                aria-label="Toggle navigation"
              >
                {drawer ? <X size={19} /> : <Menu size={19} />}
              </button>
            </>
          )}
        </div>
      </header>
      <main className="constellation-main">
        <div className="lens">
          <p>{meta[page].lens}</p>
          <Link href="/" aria-label="Back to all workspaces">
            <ArrowLeft size={16} />
          </Link>
        </div>
        <section className="workspace-heading">
          <div>
            <h1>{meta[page].title}</h1>
            <p>{meta[page].description}</p>
          </div>
          <div className="service-beacon">
            <i />
            <span>Live at {restaurant.name}</span>
          </div>
        </section>
        {content}
      </main>
    </div>
  );
}

function Guest({
  cart,
  setCart,
  constraints,
  setConstraints,
  table,
  onSubmit,
  nextOrderNumber,
  onAddToWaitlist,
  waitlistPosition,
  serverMode,
}: {
  cart: string[];
  setCart: (items: string[]) => void;
  constraints: string[];
  setConstraints: (items: string[]) => void;
  table: boolean;
  onSubmit: (order: SubmittedOrder) => void;
  nextOrderNumber: number;
  onAddToWaitlist: (customer: WaitlistCustomer) => void;
  waitlistPosition: number;
  serverMode: boolean;
}) {
  const total = useMemo(
    () =>
      cart.reduce(
        (sum, id) =>
          sum + (menu.find((item) => item.id === id)?.priceCents ?? 0),
        0,
      ),
    [cart],
  );
  const visibleMenu = useMemo(
    () =>
      menu.filter((dish) => {
        const allergenFilters = constraints.filter((item) => item !== "Vegan");
        const matchesDiet =
          !constraints.includes("Vegan") || dish.dietary.includes("Vegan");
        const avoidsAllergens = !allergenFilters.some((constraint) =>
          dish.allergens.includes(constraint),
        );
        return matchesDiet && avoidsAllergens;
      }),
    [constraints],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("PAY_AT_COUNTER");
  const [orderId, setOrderId] = useState("");
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistName, setWaitlistName] = useState("");
  const [partySize, setPartySize] = useState(2);

  const addDish = (dishId: string) => {
    setCart([...cart, dishId]);
    setOrderId(`RP-${String(nextOrderNumber).padStart(4, "0")}`);
    setModalOpen(true);
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedCart = cart;
    const submittedTotal = submittedCart.reduce(
      (sum, id) => sum + (menu.find((item) => item.id === id)?.priceCents ?? 0),
      0,
    );
    onSubmit({
      id: orderId,
      customerName: customerName.trim(),
      table: table
        ? "T08"
        : serverMode
          ? `T${tableNumber.trim().padStart(2, "0")}`
          : "Counter",
      notes: notes.trim(),
      paymentStatus: serverMode ? "NOT_REQUIRED" : paymentStatus,
      itemIds: submittedCart,
      total: submittedTotal,
    });
    setCart([]);
    setCustomerName("");
    setTableNumber("");
    setNotes("");
    setPaymentStatus("PAY_AT_COUNTER");
    setModalOpen(false);
    toast.success(
      serverMode
        ? `Order ${orderId} sent to the kitchen`
        : `Order ${orderId} sent to the kitchen and billing`,
    );
  };

  const submitWaitlistCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const estimate = 12 + waitlistPosition * 2;
    onAddToWaitlist({
      id: `WL-${String(waitlistPosition).padStart(3, "0")}`,
      name: waitlistName.trim(),
      party: partySize,
      estimate,
    });
    setWaitlistName("");
    setPartySize(2);
    setWaitlistModalOpen(false);
    toast.success(`${waitlistName.trim()} added to the waitlist`);
  };

  return (
    <>
      <section className="guest-signal">
        <div className="signal-copy">
          <span>
            {table ? "TABLE 08 / YOUR LIVE SESSION" : "SERVER ORDER STATION"}
          </span>
          <h2>
            {table
              ? "Your table is already in rhythm."
              : "Every request reaches the kitchen."}
          </h2>
          <p>
            {table
              ? "Two guests - Server Sam is nearby - Your order can carry every preference."
              : `${restaurant.activeTables} tables are in motion. Add dishes, customer details and special requests here.`}
          </p>
          {!table && (
            <button
              className="waitlist-action"
              type="button"
              onClick={() => setWaitlistModalOpen(true)}
            >
              Add customer to waitlist <ArrowUpRight size={17} />
            </button>
          )}
        </div>
        <div className="signal-orbit">
          <b>
            18<span>min</span>
          </b>
          <small>Current wait</small>
          <i className="ring one" />
          <i className="ring two" />
          <em>*</em>
        </div>
      </section>
      <section className="preference-strip">
        <div>
          <p>DIETARY & ALLERGEN FILTERS</p>
          <h3>
            Showing {visibleMenu.length} of {menu.length} dishes that match.
          </h3>
        </div>
        <div>
          {["Soy", "Peanut", "Dairy", "Gluten", "Vegan"].map((item) => (
            <button
              key={item}
              className={constraints.includes(item) ? "chosen" : ""}
              aria-pressed={constraints.includes(item)}
              aria-label={
                item === "Vegan"
                  ? "Show vegan dishes only"
                  : `Exclude dishes containing ${item}`
              }
              title={
                item === "Vegan"
                  ? "Show vegan dishes only"
                  : `Exclude ${item}`
              }
              onClick={() =>
                setConstraints(
                  constraints.includes(item)
                    ? constraints.filter((x) => x !== item)
                    : [...constraints, item],
                )
              }
            >
              {constraints.includes(item) && <Check size={13} />}
              {item}
            </button>
          ))}
        </div>
      </section>
      {visibleMenu.length > 0 ? (
        <section className="dish-field">
          {visibleMenu.map((dish, index) => (
            <article className={`dish-cell cell-${index + 1}`} key={dish.id}>
              <div
                className="dish-visual"
              >
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <span>{dish.prepMinutes} min</span>
              </div>
              <div className="dish-copy">
                <div>
                  <p>
                    {dish.availability === "AVAILABLE"
                      ? "* Available now"
                      : dish.availability === "REVIEW"
                        ? "! Ask before ordering"
                        : "~ Can modify"}
                  </p>
                  <h3>{dish.name}</h3>
                  <small>{dish.description}</small>
                </div>
                <div className="dish-footer">
                  <b>₹{(dish.priceCents / 100).toFixed(2)}</b>
                  <button onClick={() => addDish(dish.id)}>
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="filter-empty">
          <h3>No matching dishes</h3>
          <p>
            Remove one or more customer-need filters to see available options.
          </p>
          <button onClick={() => setConstraints([])}>Clear all filters</button>
        </section>
      )}
      {cart.length > 0 && (
        <aside className="order-orb">
          <div>
            <span>
              {cart.length} selection{cart.length > 1 ? "s" : ""}
            </span>
            <b>₹{(total / 100).toFixed(2)}</b>
            <small>
              {serverMode
                ? "Table and customer details required"
                : "Customer and payment details required"}
            </small>
          </div>
          <button onClick={() => setModalOpen(true)}>
            Review order <ArrowUpRight size={17} />
          </button>
        </aside>
      )}
      {waitlistModalOpen && (
        <div
          className="order-modal-backdrop"
          role="presentation"
          onMouseDown={() => setWaitlistModalOpen(false)}
        >
          <section
            className="order-modal waitlist-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <p>WAITLIST</p>
                <h2 id="waitlist-modal-title">Add a customer</h2>
              </div>
              <button
                type="button"
                onClick={() => setWaitlistModalOpen(false)}
                aria-label="Close waitlist form"
              >
                <X size={20} />
              </button>
            </header>
            <div className="order-id">
              <span>Position in line</span>
              <strong>#{waitlistPosition}</strong>
            </div>
            <form onSubmit={submitWaitlistCustomer}>
              <label>
                Customer name
                <input
                  value={waitlistName}
                  onChange={(event) => setWaitlistName(event.target.value)}
                  placeholder="Enter customer name"
                  required
                  autoFocus
                />
              </label>
              <label>
                Number of guests
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={partySize}
                  onChange={(event) => setPartySize(Number(event.target.value))}
                  required
                />
              </label>
              <button className="submit-order" type="submit">
                Add to waitlist <ArrowUpRight size={17} />
              </button>
            </form>
          </section>
        </div>
      )}
      {modalOpen && (
        <div
          className="order-modal-backdrop"
          role="presentation"
          onMouseDown={() => setModalOpen(false)}
        >
          <section
            className="order-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <p>SERVER ORDER</p>
                <h2 id="order-modal-title">Complete order details</h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close order details"
              >
                <X size={20} />
              </button>
            </header>
            <div className="order-id">
              <span>Order ID</span>
              <strong>{orderId}</strong>
            </div>
            <div className="order-summary">
              {cart.map((id, index) => {
                const dish = menu.find((item) => item.id === id);
                return dish ? (
                  <span key={`${id}-${index}`}>
                    {dish.name}
                    <b>₹{(dish.priceCents / 100).toFixed(2)}</b>
                  </span>
                ) : null;
              })}
              <footer>
                <b>Total</b>
                <strong>₹{(total / 100).toFixed(2)}</strong>
              </footer>
            </div>
            <form onSubmit={submitOrder}>
              {serverMode && (
                <label>
                  Table number
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={tableNumber}
                    onChange={(event) => setTableNumber(event.target.value)}
                    placeholder="For example, 8"
                    required
                    autoFocus
                  />
                </label>
              )}
              <label>
                Customer name
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Enter customer name"
                  required
                  autoFocus={!serverMode}
                />
              </label>
              <label>
                Special requests / customer needs
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Allergies, spice level, preparation or service notes"
                  rows={3}
                />
              </label>
              {!serverMode && (
                <fieldset>
                  <legend>Payment</legend>
                  <label
                    className={
                      paymentStatus === "PAY_AT_COUNTER" ? "selected" : ""
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentStatus === "PAY_AT_COUNTER"}
                      onChange={() => setPaymentStatus("PAY_AT_COUNTER")}
                    />
                    Pay at counter
                  </label>
                  <label
                    className={paymentStatus === "PAID_CASH" ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentStatus === "PAID_CASH"}
                      onChange={() => setPaymentStatus("PAID_CASH")}
                    />
                    Paid cash
                  </label>
                </fieldset>
              )}
              <button className="submit-order" type="submit">
                Send to kitchen <ArrowUpRight size={17} />
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

function Queue({ addedCustomers }: { addedCustomers: WaitlistCustomer[] }) {
  return (
    <section className="arrival-layout">
      <div className="arrival-core">
        <p>YOUR CURRENT ESTIMATE</p>
        <strong>
          18<span>min</span>
        </strong>
        <h2>We are setting the right table free.</h2>
        <div className="arrival-math">
          <span>
            <b>02</b> parties ahead
          </span>
          <i>+</i>
          <span>
            <b>04</b> fitting tables
          </span>
          <i>=</i>
          <span>
            <b>18m</b> estimate
          </span>
        </div>
      </div>
      <div className="queue-list">
        {queue.map((entry) => (
          <article key={entry.position}>
            <span>{String(entry.position).padStart(2, "0")}</span>
            <div>
              <b>{entry.name}</b>
              <small>
                {entry.party} guests - {entry.note}
              </small>
            </div>
            <strong>{entry.estimate}m</strong>
            <button
              onClick={() =>
                toast.success(`${entry.name} marked ready to seat`)
              }
            >
              Seat
            </button>
          </article>
        ))}
        {addedCustomers.map((entry, index) => (
          <article className="new-waitlist-entry" key={entry.id}>
            <span>{String(queue.length + index + 1).padStart(2, "0")}</span>
            <div>
              <b>{entry.name}</b>
              <small>{entry.party} guests - Added by server</small>
            </div>
            <strong>{entry.estimate}m</strong>
            <button
              onClick={() =>
                toast.success(`${entry.name} marked ready to seat`)
              }
            >
              Seat
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Service() {
  return (
    <section className="floor-layout">
      <div className="floor-grid">
        {Array.from({ length: 14 }, (_, index) => (
          <button
            key={index}
            className={index === 7 ? "urgent" : index < 10 ? "seated" : "free"}
            onClick={() =>
              toast.info(`Table ${String(index + 1).padStart(2, "0")} selected`)
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
        <p>THE NEXT THREE MOMENTS</p>
        {[
          ["08", "Resolve gluten substitution", "Safety-critical"],
          ["11", "Deliver ready dishes", "1 min ago"],
          ["04", "Bring water", "2 min ago"],
        ].map(([table, title, note]) => (
          <button
            key={title}
            onClick={() => toast.success(`${title} assigned to you`)}
          >
            <span>T{table}</span>
            <b>
              {title}
              <small>{note}</small>
            </b>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Kitchen({ submittedOrders }: { submittedOrders: SubmittedOrder[] }) {
  return (
    <section className="line-board">
      {submittedOrders.map((order) => (
        <article className="heat-card new-order" key={order.id}>
          <header>
            <span>{order.table}</span>
            <b>{order.id}</b>
            <em>new</em>
          </header>
          <div>
            <p>SERVER ORDER</p>
            <h3>{order.customerName}</h3>
            <small>
              {order.itemIds
                .map((id) => menu.find((item) => item.id === id)?.name)
                .filter(Boolean)
                .join(" · ")}
            </small>
            {order.notes && (
              <aside>
                <CircleAlert size={16} />
                <span>
                  <b>Customer request</b>
                  {order.notes}
                </span>
              </aside>
            )}
          </div>
          <footer>
            <button onClick={() => toast.success(`${order.id} started`)}>
              Start
            </button>
            <button
              onClick={() => toast.success(`${order.id} ready for service`)}
            >
              Ready
            </button>
          </footer>
        </article>
      ))}
      {orders.map((order) => (
        <article
          className={
            order.status === "REQUIRES_ATTENTION"
              ? "heat-card alert"
              : "heat-card"
          }
          key={order.id}
        >
          <header>
            <span>{order.table}</span>
            <b>{order.id}</b>
            <em>{order.elapsed}m</em>
          </header>
          <div>
            <p>{order.status.replaceAll("_", " ")}</p>
            <h3>{order.guest}</h3>
            <small>{order.items.join(" - ")}</small>
            {order.safety && (
              <aside>
                <ShieldCheck size={16} />
                <span>
                  <b>SafePlate pause</b>
                  {order.safety}
                </span>
              </aside>
            )}
          </div>
          <footer>
            <button onClick={() => toast.success(`${order.id} started`)}>
              Start
            </button>
            <button
              onClick={() => toast.success(`${order.id} ready for service`)}
            >
              Ready
            </button>
          </footer>
        </article>
      ))}
    </section>
  );
}

function Inventory() {
  return (
    <section className="pantry-map">
      <div className="ingredient-axis">
        {inventory.map((item) => (
          <article key={item.name}>
            <span>{item.name.charAt(0)}</span>
            <div>
              <b>{item.name}</b>
              <small>
                {item.remaining} {item.unit} remaining
              </small>
            </div>
            <div className="supply-line">
              <i style={{ width: `${item.percent}%` }} />
            </div>
            <em className={item.state.toLowerCase()}>{item.state}</em>
            <button
              onClick={() => toast.info(`${item.name} adjustment opened`)}
            >
              <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <aside>
        <Leaf size={26} />
        <p>LIVE IMPACT</p>
        <h2>
          Ingredient changes ripple through menu and orders automatically.
        </h2>
        <span>
          Chicken is low, 3 menu items watched, 1 active order monitored
        </span>
      </aside>
    </section>
  );
}

function Safety() {
  return (
    <section className="safety-circuit">
      <div className="relay-card">
        <p>ORDER RP-1048 - TABLE 08</p>
        <h2>The recipe changed. The promise must stay visible.</h2>
        <div className="conflict">
          <CircleAlert size={19} />
          <span>
            <b>Gluten conflict detected</b>The new recipe is not compatible with
            Maya&apos;s constraint.
          </span>
        </div>
        <div className="protocol-status">
          <Check size={18} />
          <span>
            <b>Cross-contamination protocols followed</b>
            Separate utensils, prep surface and handoff checks confirmed.
          </span>
        </div>
        <button
          onClick={() => toast.success("Kitchen acknowledgement recorded")}
        >
          Acknowledge in kitchen <ShieldCheck size={17} />
        </button>
      </div>
      <div className="relay-path">
        {[
          ["01", "Guest", "Gluten saved with order", true],
          ["02", "Service", "Acknowledged by Sam", true],
          ["03", "Kitchen", "Waiting for confirmation", false],
          ["04", "Delivery", "Unlocks after prep", false],
        ].map(([number, title, detail, done]) => (
          <article className={done ? "done" : ""} key={title as string}>
            <span>{done ? <Check size={15} /> : number}</span>
            <b>
              {title}
              <small>{detail}</small>
            </b>
          </article>
        ))}
      </div>
      <div className="alternative-burst">
        <p>SAFE ALTERNATIVES</p>
        {["Butter Chicken", "Malai Kofta", "Baingan Bharta"].map((name) => (
          <button
            onClick={() => toast.success(`${name} sent to Maya for review`)}
            key={name}
          >
            {name}
            <small>Compatible and available</small>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Analytics({
  submittedOrders,
  waitlistCustomers,
}: {
  submittedOrders: SubmittedOrder[];
  waitlistCustomers: WaitlistCustomer[];
}) {
  const [range, setRange] = useState<"shift" | "today" | "week">("today");
  const [reviewed, setReviewed] = useState(false);
  const rangeFactor = { shift: 0.62, today: 1, week: 5.4 }[range];
  const liveOrders = orders.length + submittedOrders.length;
  const baseRevenue =
    orders.reduce((sum, order) => sum + order.amount, 0) +
    submittedOrders.reduce((sum, order) => sum + order.total / 100, 0);
  const revenue = Math.round(baseRevenue * rangeFactor);
  const averagePrep = Math.round(
    orders.reduce((sum, order) => sum + order.elapsed, 0) / orders.length,
  );
  const waitingParties = queue.length + waitlistCustomers.length;
  const waitingGuests =
    queue.reduce((sum, entry) => sum + entry.party, 0) +
    waitlistCustomers.reduce((sum, entry) => sum + entry.party, 0);
  const criticalStock = inventory.filter(
    (item) => item.state === "CRITICAL",
  ).length;
  const safetyIssues = orders.filter(
    (order) => order.status === "REQUIRES_ATTENTION",
  ).length;
  const cashOrders = submittedOrders.filter(
    (order) => order.paymentStatus === "PAID_CASH",
  ).length;
  const cashShare = submittedOrders.length
    ? Math.round((cashOrders / submittedOrders.length) * 100)
    : 0;
  const rangeLabel =
    range === "shift"
      ? "Current shift"
      : range === "today"
        ? "Today"
        : "7 days";
  const signal =
    criticalStock > 0
      ? {
          title: `${criticalStock} critical stock item may affect active orders.`,
          detail: `Butter Chicken / Paneer is at ${inventory[0].percent}%. Prioritize replenishment and guide servers toward available alternatives.`,
          action: "Notify pantry",
        }
      : waitingParties >= 5
        ? {
            title: `${waitingParties} parties are waiting for a table.`,
            detail:
              "Prepare the next fitting tables and move one server to arrivals.",
            action: "Alert service",
          }
        : {
            title: "Service is operating within normal thresholds.",
            detail:
              "No immediate intervention is needed. Continue monitoring prep time and table flow.",
            action: "Mark reviewed",
          };

  return (
    <>
      <div className="analytics-toolbar">
        <div>
          <b>Live operations</b>
          <span>{liveOrders} orders currently tracked</span>
        </div>
        <div className="range-filter" aria-label="Analytics time range">
          {(["shift", "today", "week"] as const).map((option) => (
            <button
              key={option}
              className={range === option ? "active" : ""}
              aria-pressed={range === option}
              onClick={() => setRange(option)}
            >
              {option === "shift"
                ? "This shift"
                : option === "today"
                  ? "Today"
                  : "7 days"}
            </button>
          ))}
        </div>
      </div>
      <section className="signal-field">
        <article className={`signal-card main ${reviewed ? "reviewed" : ""}`}>
          <Sparkles size={24} />
          <p>{reviewed ? "ACTION RECORDED" : "STRONGEST LIVE SIGNAL"}</p>
          <h2>{reviewed ? "The team has been notified." : signal.title}</h2>
          <span>
            {reviewed
              ? "This recommendation is acknowledged and remains visible for the current shift."
              : signal.detail}
          </span>
          <button
            onClick={() => {
              setReviewed(!reviewed);
              toast.success(
                reviewed
                  ? "Signal returned to active"
                  : `${signal.action} action recorded`,
              );
            }}
          >
            {reviewed ? "Reopen signal" : signal.action} <Check size={15} />
          </button>
        </article>
        <article className="signal-card">
          <p>NET ORDER VALUE · {rangeLabel}</p>
          <h3>₹{revenue.toLocaleString("en-IN")}</h3>
          <b>{liveOrders} live and submitted orders</b>
        </article>
        <article className="signal-card">
          <p>AVERAGE KITCHEN TIME</p>
          <h3>{averagePrep} min</h3>
          <b className={averagePrep > 15 ? "metric-warning" : ""}>
            {averagePrep > 15 ? "Needs attention" : "Within target"}
          </b>
        </article>
        <article className="signal-card">
          <p>WAITLIST LOAD</p>
          <h3>{waitingParties}</h3>
          <b>{waitingGuests} guests waiting</b>
        </article>
        <article className="signal-card">
          <p>SAFEPLATE STATUS</p>
          <h3>{safetyIssues === 0 ? "100%" : `${safetyIssues} open`}</h3>
          <b className={safetyIssues ? "metric-warning" : ""}>
            {safetyIssues ? "Review required" : "All checks complete"}
          </b>
        </article>
        <article className="signal-card">
          <p>CASH PAYMENT SHARE</p>
          <h3>{cashShare}%</h3>
          <b>{submittedOrders.length} server orders recorded</b>
        </article>
      </section>
    </>
  );
}

function Billing({ submittedOrders }: { submittedOrders: SubmittedOrder[] }) {
  const active = submittedOrders[0];
  return (
    <section className="close-layout">
      <div className="receipt">
        {active ? (
          <>
            <p>
              {active.paymentStatus === "PAID_CASH"
                ? "PAID CASH"
                : "PAY AT COUNTER"}{" "}
              · {active.id}
            </p>
            <h2>{active.customerName}</h2>
            {active.itemIds.map((id, index) => {
              const dish = menu.find((item) => item.id === id);
              return dish ? (
                <span key={`${id}-${index}`}>
                  {dish.name}
                  <b>₹{(dish.priceCents / 100).toFixed(2)}</b>
                </span>
              ) : null;
            })}
            {active.notes && (
              <div className="billing-note">
                <b>Customer note</b>
                {active.notes}
              </div>
            )}
            <footer>
              <b>Total</b>
              <strong>₹{(active.total / 100).toFixed(2)}</strong>
            </footer>
            {active.paymentStatus === "PAY_AT_COUNTER" ? (
              <button
                onClick={() =>
                  toast.success(`Payment recorded for ${active.id}`)
                }
              >
                Mark paid <CreditCard size={16} />
              </button>
            ) : (
              <div className="paid-badge">
                <Check size={16} /> Cash payment recorded
              </div>
            )}
          </>
        ) : (
          <>
            <p>READY TO CLOSE - TABLE 11</p>
            <h2>Ananya Patel</h2>
            <span>
              Baingan Bharta <b>₹145.00</b>
            </span>
            <span>
              Kadhai Paneer <b>₹220.00</b>
            </span>
            <span>
              CGST/SGST <b>₹32.85</b>
            </span>
            <footer>
              <b>Total</b>
              <strong>₹397.85</strong>
            </footer>
            <button
              onClick={() =>
                toast.success("Payment recorded. Receipt RP-1046 is ready.")
              }
            >
              Mark paid <CreditCard size={16} />
            </button>
          </>
        )}
      </div>
      <div className="receipt-stream">
        <p>ORDER & PAYMENT STREAM</p>
        {submittedOrders.map((order) => (
          <button
            key={order.id}
            onClick={() =>
              toast.info(
                `${order.id}: ${order.paymentStatus === "PAID_CASH" ? "Paid cash" : "Pay at counter"}`,
              )
            }
          >
            <Check size={15} />
            {order.id} · {order.customerName} · ₹
            {(order.total / 100).toFixed(2)}
            <ArrowUpRight size={15} />
          </button>
        ))}
        {["RP-1045 - ₹640.00", "RP-1044 - ₹480.00", "RP-1043 - ₹350.00"].map(
          (receipt) => (
            <button
              key={receipt}
              onClick={() => toast.info(`${receipt} opened`)}
            >
              <Check size={15} />
              {receipt}
              <ArrowUpRight size={15} />
            </button>
          ),
        )}
      </div>
    </section>
  );
}
