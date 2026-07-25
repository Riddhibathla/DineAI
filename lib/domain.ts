export const dietaryConstraints = [
  "PEANUT", "TREE_NUT", "DAIRY", "GLUTEN", "EGG", "SOY", "SHELLFISH",
  "FISH", "SESAME", "VEGETARIAN", "VEGAN", "HALAL",
] as const;

export type DietaryConstraint = (typeof dietaryConstraints)[number];
export type Compatibility = "COMPATIBLE" | "MODIFIABLE" | "INCOMPATIBLE" | "UNCERTAIN";

export interface IngredientFact {
  name: string;
  allergens: DietaryConstraint[];
  crossContact: DietaryConstraint[];
  verified: boolean;
  removable?: boolean;
}

export function classifyDish(
  ingredients: IngredientFact[],
  constraints: DietaryConstraint[],
): { status: Compatibility; reasons: string[] } {
  if (ingredients.length === 0 || ingredients.some((i) => !i.verified)) {
    return { status: "UNCERTAIN", reasons: ["One or more ingredient records are not verified."] };
  }
  const direct = ingredients.filter((i) => i.allergens.some((a) => constraints.includes(a)));
  const cross = ingredients.filter((i) => i.crossContact.some((a) => constraints.includes(a)));
  if (direct.length && direct.every((i) => i.removable)) {
    return { status: "MODIFIABLE", reasons: direct.map((i) => `Remove ${i.name} before preparation.`) };
  }
  if (direct.length) {
    return { status: "INCOMPATIBLE", reasons: direct.map((i) => `${i.name} conflicts with the selected constraints.`) };
  }
  if (cross.length) {
    return { status: "UNCERTAIN", reasons: cross.map((i) => `${i.name} has a documented cross-contact risk.`) };
  }
  return { status: "COMPATIBLE", reasons: ["Verified ingredient records contain no selected conflicts."] };
}

export function calculateBill(
  lines: Array<{ priceCents: number; quantity: number }>,
  taxBasisPoints: number,
  discountCents = 0,
) {
  const subtotalCents = lines.reduce((total, line) => total + line.priceCents * line.quantity, 0);
  const taxCents = Math.round((subtotalCents * taxBasisPoints) / 10_000);
  const totalCents = Math.max(0, subtotalCents + taxCents - discountCents);
  return { subtotalCents, taxCents, discountCents, totalCents };
}

export function estimatePreparation(baseMinutes: number, activeItemsAhead: number, complexity = 1) {
  return Math.max(baseMinutes, Math.round(baseMinutes * complexity + activeItemsAhead * 1.5));
}

export function estimateQueueWait(partiesAhead: number, availableSuitableTables: number, expectedDiningMinutes: number) {
  if (availableSuitableTables > 0) return 0;
  return Math.max(5, Math.ceil(partiesAhead / 3) * Math.round(expectedDiningMinutes / 3));
}

const transitions: Record<string, string[]> = {
  SUBMITTED: ["ACKNOWLEDGED", "CANCELLED", "REQUIRES_ATTENTION"],
  ACKNOWLEDGED: ["PREPARING", "CANCELLED", "REQUIRES_ATTENTION"],
  PREPARING: ["READY", "CANCELLED", "REQUIRES_ATTENTION"],
  REQUIRES_ATTENTION: ["ACKNOWLEDGED", "CANCELLED"],
  READY: ["SERVED"],
  SERVED: [],
  CANCELLED: [],
};

export function canTransitionOrder(from: string, to: string) {
  return transitions[from]?.includes(to) ?? false;
}

export function recommendationScore(input: {
  compatible: boolean;
  available: boolean;
  preferenceMatch: number;
  popularity: number;
  prepMinutes: number;
  kitchenLoad: number;
}) {
  if (!input.compatible || !input.available) return -1;
  return Math.round(
    50 + input.preferenceMatch * 15 + input.popularity * 0.2 - input.prepMinutes * 0.6 - input.kitchenLoad * 0.8,
  );
}
