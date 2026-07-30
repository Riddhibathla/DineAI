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
  { id: "baingan-bharta", name: "Baingan Bharta", description: "Fire-roasted eggplant folded with tomato, onion, cumin, and fresh coriander.", priceCents: 19500, prepMinutes: 14, dietary: ["Vegan"], allergens: [], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Baigan_Bharta_from_Nagpur.JPG/1280px-Baigan_Bharta_from_Nagpur.JPG" },
  { id: "fish-curry", name: "Alleppey Fish Curry", description: "Coastal fish simmered with coconut milk, green mango, and warming spices.", priceCents: 32500, prepMinutes: 20, dietary: [], allergens: [], availability: "REVIEW", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Alappy_Fish_Curry.JPG/1280px-Alappy_Fish_Curry.JPG" },
  { id: "kadhai-paneer", name: "Kadhai Paneer", description: "Paneer and peppers tossed in a bold tomato gravy with crushed coriander.", priceCents: 28500, prepMinutes: 17, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "MODIFIABLE", image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Kadai_Paneer-Delhi-12.jpg" },
  { id: "malai-kofta", name: "Malai Kofta", description: "Paneer-potato dumplings in a silky cashew, tomato, and cream sauce.", priceCents: 29500, prepMinutes: 18, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/MalaiKofta.jpg/1280px-MalaiKofta.jpg" },
  { id: "butter-chicken", name: "Butter Chicken", description: "Charred chicken finished in a velvety tomato, butter, and fenugreek gravy.", priceCents: 34500, prepMinutes: 19, dietary: [], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg" },
  { id: "prawn-curry", name: "Goan Prawn Curry", description: "Juicy prawns in a bright coconut curry with tamarind and red chilli.", priceCents: 36500, prepMinutes: 18, dietary: [], allergens: [], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Indian_Shrimp_Curry_1.jpg/1280px-Indian_Shrimp_Curry_1.jpg" },
  { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with tomato, butter, and cream.", priceCents: 24500, prepMinutes: 16, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "MODIFIABLE", image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Punjabi_style_Dal_Makhani.jpg" },
  { id: "chole-bhature", name: "Chole Bhature", description: "Spiced chickpeas with pillowy fried bhature, pickle, and sliced onion.", priceCents: 22500, prepMinutes: 13, dietary: ["Vegetarian"], allergens: ["Gluten"], availability: "REVIEW", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/1280px-Chole_Bhature_from_Nagpur.JPG" },
  { id: "palak-paneer", name: "Palak Paneer", description: "Paneer cubes in a vibrant spinach gravy scented with garlic and garam masala.", priceCents: 27500, prepMinutes: 16, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Palakpaneer_Rayagada_Odisha_0009.jpg" },
  { id: "chicken-biryani", name: "Hyderabadi Chicken Biryani", description: "Saffron basmati layered with marinated chicken, fried onions, and mint.", priceCents: 38500, prepMinutes: 24, dietary: [], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg" },
  { id: "samosa", name: "Vegetable Samosa", description: "Crisp pastry pockets filled with potato, peas, ginger, and toasted spices.", priceCents: 14500, prepMinutes: 10, dietary: ["Vegan"], allergens: ["Gluten"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/1280px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg" },
  { id: "masala-dosa", name: "Masala Dosa", description: "Golden rice-lentil crêpe with potato masala, sambar, and peanut chutney.", priceCents: 23500, prepMinutes: 15, dietary: ["Vegan"], allergens: ["Peanut"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Masala_Dosa_2023.jpg/1280px-Masala_Dosa_2023.jpg" },
  { id: "rogan-josh", name: "Kashmiri Rogan Josh", description: "Slow-braised lamb in an aromatic Kashmiri chilli, fennel, and ginger gravy.", priceCents: 42500, prepMinutes: 25, dietary: [], allergens: ["Dairy"], availability: "REVIEW", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Rogan_Josh_Kashmiri.jpg" },
  { id: "tandoori-chicken", name: "Tandoori Chicken", description: "Yogurt-marinated chicken roasted until smoky and served with mint chutney.", priceCents: 35500, prepMinutes: 22, dietary: [], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Chickentandoori.jpg" },
  { id: "sabudana-khichdi", name: "Sabudana Khichdi", description: "Tapioca pearls tossed with roasted peanuts, potato, cumin, and fresh lime.", priceCents: 21500, prepMinutes: 14, dietary: ["Vegan"], allergens: ["Peanut"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Yummy_Sabudana_Khichdi.jpg/1280px-Yummy_Sabudana_Khichdi.jpg" },
  { id: "rajma-chawal", name: "Rajma Chawal", description: "Creamy red kidney bean curry served with fragrant steamed basmati rice.", priceCents: 22500, prepMinutes: 15, dietary: ["Vegan"], allergens: [], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rajma_Chawal_Thali.jpg/1280px-Rajma_Chawal_Thali.jpg" },
  { id: "soya-chaap", name: "Soya Chaap Curry", description: "Tender soy chaap simmered in a smoky onion-tomato masala with coriander.", priceCents: 27500, prepMinutes: 18, dietary: ["Vegetarian"], allergens: ["Soy", "Gluten"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Soya_Chaap_with_curry.jpg/1280px-Soya_Chaap_with_curry.jpg" },
  { id: "gulab-jamun", name: "Gulab Jamun", description: "Warm milk-solid dumplings soaked in rose, saffron, and cardamom syrup.", priceCents: 13500, prepMinutes: 8, dietary: ["Vegetarian"], allergens: ["Dairy", "Gluten"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg" },
  { id: "ras-malai", name: "Ras Malai", description: "Soft chenna cakes in chilled saffron-cardamom milk finished with pistachio.", priceCents: 15500, prepMinutes: 7, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/1280px-Ras_Malai_2.JPG" },
  { id: "kulfi", name: "Matka Kulfi", description: "Dense traditional ice cream with cardamom, saffron, and roasted pistachio.", priceCents: 14500, prepMinutes: 5, dietary: ["Vegetarian"], allergens: ["Dairy"], availability: "AVAILABLE", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Matka_kulfi.jpg" },
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
