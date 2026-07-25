import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongoose?: { connection: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const cache = globalForMongoose.mongoose ?? { connection: null, promise: null };
globalForMongoose.mongoose = cache;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required for database operations.");
  if (cache.connection) return cache.connection;
  cache.promise ??= mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8_000 });
  cache.connection = await cache.promise;
  return cache.connection;
}
