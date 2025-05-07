import { getMongoDbUri, getNodeEnv } from "@/utils/get-env";
import { MongoClient } from "mongodb";

const uri = getMongoDbUri();
const env = getNodeEnv();
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (env === "development") {
  // in development, use a global variable so the MongoClient is not constantly created and destroyed
  if (!(globalThis as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (globalThis as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (globalThis as any)._mongoClientPromise;
} else {
  // in production, create a new MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;