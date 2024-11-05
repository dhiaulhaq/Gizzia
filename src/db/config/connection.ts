import { MongoClient, Db } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING || "";

if (!connectionString) {
  throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

let client: MongoClient;

export const getMongoClientInstance = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionString);
    await client.connect();
  }

  return client;
};

export const getDb = async (): Promise<Db> => {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB_NAME || "gizzia");
};
