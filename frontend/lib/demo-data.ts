export const restaurant = {
  name: "Tandoor Bistro", open: true, queueEstimate: 18, activeTables: 10, totalTables: 14,
};

export const orders = [
  { id: "RP-1048", table: "T08", guest: "Maya Sharma", status: "REQUIRES_ATTENTION", elapsed: 14, items: ["Tamarind Fish Curry", "Samosa Chaat"], amount: 540, safety: "Gluten conflict detected" },
  { id: "RP-1047", table: "T03", guest: "Aarav Mehta", status: "PREPARING", elapsed: 11, items: ["Butter Chicken x 2"], amount: 760 },
  { id: "RP-1046", table: "T11", guest: "Ananya Patel", status: "READY", elapsed: 19, items: ["Baingan Bharta", "Dal Makhani"], amount: 385 },
  { id: "RP-1045", table: "T05", guest: "Rahul Verma", status: "SUBMITTED", elapsed: 3, items: ["Malai Kofta x 2"], amount: 640 },
];

export const menu = [
  { id: "baingan-bharta", name: "Baingan Bharta", description: "Smoked eggplant mash cooked with onions, tomatoes, and herbs", priceCents: 14500, prepMinutes: 12, tags: ["Vegan", "Gluten-free"], availability: "AVAILABLE", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },
  { id: "tamarind-fish", name: "Tamarind Fish Curry", description: "Goan style fish curry in tangy coconut and tamarind sauce", priceCents: 26500, prepMinutes: 18, tags: ["Fish"], availability: "REVIEW", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80" },
  { id: "kadhai-paneer", name: "Kadhai Paneer", description: "Cottage cheese tossed with bell peppers and freshly ground spices", priceCents: 22000, prepMinutes: 16, tags: ["Vegetarian", "Dairy"], availability: "MODIFIABLE", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80" },
  { id: "malai-kofta", name: "Malai Kofta", description: "Creamy dumplings made of paneer and potato in rich cashew gravy", priceCents: 12500, prepMinutes: 8, tags: ["Vegetarian", "Dairy"], availability: "AVAILABLE", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80" },
  { id: "butter-chicken", name: "Butter Chicken", description: "Tender chicken cooked in rich, creamy, spiced tomato gravy", priceCents: 24500, prepMinutes: 17, tags: ["Gluten-free"], availability: "AVAILABLE", image: "https://images.unsplash.com/photo-1742599361498-79824d24e355?auto=format&fit=crop&w=500&q=80" },
  { id: "tamarind-prawn", name: "Tamarind Prawns", description: "Charred lime, basmati rice, tang coconut-tamarind reduction", priceCents: 23500, prepMinutes: 14, tags: ["Shellfish", "Gluten-free"], availability: "AVAILABLE", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
  { id: "dal-makhani", name: "Dal Makhani", description: "Slow-cooked black lentils in rich, creamy, buttery gravy", priceCents: 19500, prepMinutes: 15, tags: ["Vegetarian", "Dairy"], availability: "MODIFIABLE", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },
  { id: "chana-bhature", name: "Chana Bhature", description: "Spiced chickpeas served with hot, fluffy fried leavened bread", priceCents: 16500, prepMinutes: 10, tags: ["Gluten"], availability: "REVIEW", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80" },
];

export const inventory = [
  { name: "Butter Chicken / Paneer", remaining: 4, unit: "portions", percent: 32, state: "CRITICAL" },
  { name: "Basmati Rice", remaining: 12.5, unit: "kg", percent: 78, state: "HEALTHY" },
  { name: "Black Lentils", remaining: 1.7, unit: "kg", percent: 54, state: "WATCH" },
  { name: "Tamarind Chutney", remaining: 0.9, unit: "L", percent: 42, state: "WATCH" },
];

export const queue = [
  { position: 1, name: "Neha Sen", party: 3, estimate: 12, note: "First available" },
  { position: 2, name: "The Guptas", party: 4, estimate: 18, note: "Needs booth" },
  { position: 3, name: "Kabir Kapoor", party: 2, estimate: 25, note: "Anniversary" },
];
