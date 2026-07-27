export const restaurant = {
  name: "Luma House", open: true, queueEstimate: 18, activeTables: 10, totalTables: 14,
};

export const orders = [
  { id: "RP-1048", table: "T08", guest: "Maya Chen", status: "REQUIRES_ATTENTION", elapsed: 14, items: ["Miso glazed salmon", "Citrus garden"], amount: 3900, safety: "Soy conflict detected" },
  { id: "RP-1047", table: "T03", guest: "Noah Williams", status: "PREPARING", elapsed: 11, items: ["Heritage chicken × 2"], amount: 5600 },
  { id: "RP-1046", table: "T11", guest: "Ava Patel", status: "READY", elapsed: 19, items: ["Ember aubergine", "Wild mushroom pasta"], amount: 3650 },
  { id: "RP-1045", table: "T05", guest: "Liam Jones", status: "SUBMITTED", elapsed: 3, items: ["Citrus garden × 2"], amount: 2500 },
];

export const menu = [
  { id: "ember-aubergine", name: "Ember aubergine", description: "Tahini, pomegranate, charred herbs", priceCents: 1450, prepMinutes: 12, tags: ["Vegan", "Gluten-free"], availability: "AVAILABLE", image: "ember" },
  { id: "miso-salmon", name: "Miso glazed salmon", description: "Forbidden rice, greens, yuzu", priceCents: 2650, prepMinutes: 18, tags: ["Soy", "Fish"], availability: "REVIEW", image: "tide" },
  { id: "mushroom-pasta", name: "Wild mushroom pasta", description: "Brown butter, thyme, parmesan", priceCents: 2200, prepMinutes: 16, tags: ["Vegetarian", "Gluten"], availability: "MODIFIABLE", image: "gold" },
  { id: "citrus-garden", name: "Citrus garden", description: "Fennel, orange, toasted seeds", priceCents: 1250, prepMinutes: 8, tags: ["Vegan", "Gluten-free"], availability: "AVAILABLE", image: "grove" },
  { id: "hearth-chicken", name: "Hearth chicken", description: "Smoked jus, roasted roots, crispy sage", priceCents: 2450, prepMinutes: 17, tags: ["Dairy-free", "Gluten-free"], availability: "AVAILABLE", image: "ember" },
  { id: "tamarind-prawn", name: "Tamarind prawns", description: "Charred lime, jasmine rice, herbs", priceCents: 2350, prepMinutes: 14, tags: ["Shellfish", "Gluten-free"], availability: "AVAILABLE", image: "tide" },
  { id: "summer-risotto", name: "Summer risotto", description: "Peas, lemon, aged parmesan", priceCents: 1950, prepMinutes: 15, tags: ["Vegetarian", "Dairy"], availability: "MODIFIABLE", image: "gold" },
  { id: "spiced-tofu", name: "Spiced tofu bowl", description: "Sesame greens, pickled carrot, brown rice", priceCents: 1650, prepMinutes: 10, tags: ["Vegan", "Soy", "Sesame"], availability: "REVIEW", image: "grove" },
];

export const inventory = [
  { name: "Heritage chicken", remaining: 4, unit: "portions", percent: 32, state: "CRITICAL" },
  { name: "Wild mushrooms", remaining: 1.7, unit: "kg", percent: 54, state: "WATCH" },
  { name: "Miso glaze", remaining: 0.9, unit: "L", percent: 42, state: "WATCH" },
  { name: "Citrus vinaigrette", remaining: 12, unit: "portions", percent: 78, state: "HEALTHY" },
];

export const queue = [
  { position: 1, name: "Olivia Turner", party: 3, estimate: 12, note: "First available" },
  { position: 2, name: "The Shahs", party: 4, estimate: 18, note: "Needs booth" },
  { position: 3, name: "Ethan Walker", party: 2, estimate: 25, note: "Anniversary" },
];
