export type PaymentMethod = "CARD" | "UPI" | "PAY_AT_COUNTER" | "NOT_REQUIRED";
export type PaymentStatus = "PAID" | "PENDING" | "NOT_REQUIRED";

export type SubmittedOrder = {
  id: string;
  customerName: string;
  table: string;
  notes: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetail: string;
  itemIds: string[];
  total: number;
  createdAt: string;
  source: "customer" | "server";
};

export type SeatBooking = {
  id: string;
  name: string;
  party: number;
  estimate: number;
  createdAt: string;
  source: "customer" | "server";
};

export const ORDER_STORAGE_KEY = "dineai-server-orders";
export const BOOKING_STORAGE_KEY = "dineai-waitlist";

export function readStoredList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}
