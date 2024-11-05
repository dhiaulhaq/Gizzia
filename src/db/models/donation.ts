import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";

export type DonationModel = {
  _id: ObjectId;
  amount: number;
  description: string;
  emailProvider: string; // didapat dari token cookies by user email login
  paymentDate: string;
};

export type DonationModelCreateInput = Omit<DonationModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_DONATION = "Donations";

// Fungsi untuk mendapatkan instance database
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

// Endpoint untuk mendapatkan semua donasi
export const getDonations = async (): Promise<DonationModel[]> => {
  const db = await getDb();
  const donations = await db.collection(COLLECTION_DONATION).find({}).toArray() as DonationModel[];
  return donations;
};

// Endpoint untuk membuat donasi baru
export const createDonation = async (donation: DonationModelCreateInput): Promise<DonationModel> => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_DONATION).insertOne(donation);
  return { _id: result.insertedId, ...donation };
};

// Endpoint untuk mendapatkan donasi berdasarkan email provider
export const getDonationByEmailProvider = async (email: string): Promise<DonationModel | null> => {
  const db = await getDb();
  const donation = await db.collection(COLLECTION_DONATION).findOne({ emailProvider: email }) as DonationModel | null;
  return donation;
};
