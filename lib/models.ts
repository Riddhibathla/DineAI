import { Schema, model, models } from "mongoose";

const options = { timestamps: true, strict: "throw" as const };
const scoped = { restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true } };

const UserSchema = new Schema({
  ...scoped,
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, select: false },
  role: { type: String, enum: ["CUSTOMER", "SERVER", "KITCHEN", "MANAGER", "ADMIN"], default: "CUSTOMER", index: true },
  emailVerified: Date,
  dietaryConstraints: [String],
  archivedAt: Date,
}, options);
UserSchema.index({ restaurantId: 1, email: 1 }, { unique: true });

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  currency: { type: String, default: "USD" },
  taxBasisPoints: { type: Number, default: 825 },
  expectedDiningMinutes: { type: Number, default: 75 },
  operatingHours: Schema.Types.Mixed,
  services: [String],
}, options);

const TableSchema = new Schema({
  ...scoped,
  label: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  publicToken: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ["AVAILABLE", "RESERVED", "OCCUPIED", "NEEDS_CLEANING", "OUT_OF_SERVICE"], default: "AVAILABLE", index: true },
  sessionStartedAt: Date,
}, options);

const QueueEntrySchema = new Schema({
  ...scoped,
  publicId: { type: String, required: true, unique: true },
  guestName: { type: String, required: true },
  contact: String,
  partySize: { type: Number, required: true, min: 1, max: 30 },
  status: { type: String, enum: ["WAITING", "TABLE_READY", "SEATED", "CANCELLED"], default: "WAITING", index: true },
  estimatedWaitMinutes: Number,
  assignedTableId: { type: Schema.Types.ObjectId, ref: "Table" },
}, options);

const IngredientSchema = new Schema({
  ...scoped,
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, enum: ["COUNT", "GRAM", "MILLILITRE"], required: true },
  lowStockThreshold: { type: Number, default: 0 },
  allergens: [String],
  crossContact: [String],
  verified: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
}, options);
IngredientSchema.index({ restaurantId: 1, name: 1 }, { unique: true });

const MenuCategorySchema = new Schema({ ...scoped, name: { type: String, required: true }, sortOrder: Number }, options);
const MenuItemSchema = new Schema({
  ...scoped,
  categoryId: { type: Schema.Types.ObjectId, ref: "MenuCategory", required: true },
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  priceCents: { type: Number, required: true, min: 0 },
  basePrepMinutes: { type: Number, required: true, min: 1 },
  manualAvailability: { type: String, enum: ["AUTO", "AVAILABLE", "UNAVAILABLE"], default: "AUTO" },
  featured: Boolean,
  recipe: [{ ingredientId: { type: Schema.Types.ObjectId, ref: "Ingredient" }, quantity: Number, removable: Boolean }],
  archivedAt: Date,
}, options);

const OrderSchema = new Schema({
  ...scoped,
  publicId: { type: String, required: true, unique: true, index: true },
  idempotencyKey: { type: String, required: true },
  tableId: { type: Schema.Types.ObjectId, ref: "Table" },
  customerId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["SUBMITTED", "ACKNOWLEDGED", "PREPARING", "READY", "SERVED", "CANCELLED", "REQUIRES_ATTENTION"], default: "SUBMITTED", index: true },
  constraintsSnapshot: [String],
  items: [{
    menuItemId: Schema.Types.ObjectId,
    name: String,
    priceCents: Number,
    quantity: Number,
    notes: String,
    ingredientSnapshot: [Schema.Types.Mixed],
  }],
  subtotalCents: Number,
  taxCents: Number,
  totalCents: Number,
  inventoryDeductedAt: Date,
  statusHistory: [{ status: String, actorId: Schema.Types.ObjectId, at: Date, reason: String }],
}, options);
OrderSchema.index({ restaurantId: 1, idempotencyKey: 1 }, { unique: true });

const genericSchemas = {
  InventoryTransaction: new Schema({ ...scoped, ingredientId: Schema.Types.ObjectId, delta: Number, reason: String, idempotencyKey: { type: String, unique: true }, actorId: Schema.Types.ObjectId }, options),
  Bill: new Schema({ ...scoped, orderId: { type: Schema.Types.ObjectId, unique: true }, receiptNumber: { type: String, unique: true }, subtotalCents: Number, taxCents: Number, discountCents: Number, discountReason: String, totalCents: Number, status: { type: String, enum: ["UNPAID", "PAID"], default: "UNPAID" }, paidAt: Date, paidBy: Schema.Types.ObjectId }, options),
  ServiceRequest: new Schema({ ...scoped, tableId: Schema.Types.ObjectId, type: String, details: String, status: { type: String, enum: ["OPEN", "ACKNOWLEDGED", "RESOLVED"], default: "OPEN" }, ownerId: Schema.Types.ObjectId, resolvedAt: Date }, options),
  Notification: new Schema({ ...scoped, recipientId: Schema.Types.ObjectId, recipientRole: String, title: String, message: String, href: String, dedupeKey: { type: String, index: true }, readAt: Date }, options),
  SafetyCheck: new Schema({ ...scoped, orderId: { type: Schema.Types.ObjectId, index: true }, stage: { type: String, enum: ["SERVER_ACK", "KITCHEN_ACK", "PREP_CHECK", "DELIVERY_VERIFY"] }, actorId: Schema.Types.ObjectId, completedAt: Date, notes: String }, options),
  OperationalEvent: new Schema({ ...scoped, type: { type: String, index: true }, entityType: String, entityId: Schema.Types.ObjectId, payload: Schema.Types.Mixed, occurredAt: { type: Date, default: Date.now, index: true } }, options),
};

export const User = models.User || model("User", UserSchema);
export const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);
export const RestaurantTable = models.RestaurantTable || model("RestaurantTable", TableSchema);
export const QueueEntry = models.QueueEntry || model("QueueEntry", QueueEntrySchema);
export const Ingredient = models.Ingredient || model("Ingredient", IngredientSchema);
export const MenuCategory = models.MenuCategory || model("MenuCategory", MenuCategorySchema);
export const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);
export const Order = models.Order || model("Order", OrderSchema);
export const InventoryTransaction = models.InventoryTransaction || model("InventoryTransaction", genericSchemas.InventoryTransaction);
export const Bill = models.Bill || model("Bill", genericSchemas.Bill);
export const ServiceRequest = models.ServiceRequest || model("ServiceRequest", genericSchemas.ServiceRequest);
export const Notification = models.Notification || model("Notification", genericSchemas.Notification);
export const SafetyCheck = models.SafetyCheck || model("SafetyCheck", genericSchemas.SafetyCheck);
export const OperationalEvent = models.OperationalEvent || model("OperationalEvent", genericSchemas.OperationalEvent);
