import { describe, expect, it } from "vitest";
import {
  calculateBill, canTransitionOrder, classifyDish, estimatePreparation,
  estimateQueueWait, recommendationScore,
} from "../lib/domain";

describe("SafePlate constraint engine", () => {
  it("fails safely for unverified data", () => {
    expect(classifyDish([{ name: "sauce", allergens: [], crossContact: [], verified: false }], ["SOY"]).status).toBe("UNCERTAIN");
  });
  it("explains direct conflicts", () => {
    const result = classifyDish([{ name: "miso", allergens: ["SOY"], crossContact: [], verified: true }], ["SOY"]);
    expect(result.status).toBe("INCOMPATIBLE");
    expect(result.reasons[0]).toContain("miso");
  });
  it("identifies removable conflicts", () => {
    expect(classifyDish([{ name: "cheese", allergens: ["DAIRY"], crossContact: [], verified: true, removable: true }], ["DAIRY"]).status).toBe("MODIFIABLE");
  });
});

describe("operational calculations", () => {
  it("uses integer-safe bill calculations", () => {
    expect(calculateBill([{ priceCents: 1099, quantity: 2 }], 825, 100)).toEqual({
      subtotalCents: 2198, taxCents: 181, discountCents: 100, totalCents: 2279,
    });
  });
  it("estimates waits and preparation", () => {
    expect(estimateQueueWait(4, 0, 75)).toBe(50);
    expect(estimatePreparation(12, 4, 1.2)).toBe(20);
  });
  it("prevents invalid status transitions", () => {
    expect(canTransitionOrder("SUBMITTED", "READY")).toBe(false);
    expect(canTransitionOrder("PREPARING", "READY")).toBe(true);
  });
  it("never recommends unavailable dishes", () => {
    expect(recommendationScore({ compatible: true, available: false, preferenceMatch: 1, popularity: 90, prepMinutes: 10, kitchenLoad: 2 })).toBe(-1);
  });
});
