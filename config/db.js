import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  try {
    // await client.connect(); // MongoDB driver 7+ often handles connection pooling automatically, but explicit connect is fine
    db = client.db("artifyDB");
    console.log("Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

export const getCollection = (collectionName) => {
    return getDB().collection(collectionName);
};

export default client;
