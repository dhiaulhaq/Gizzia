import { NextResponse } from "next/server";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";

export type Identification = {
  foodName: string;
  nutrition: string;
};

export type IdentificationModel = {
  _id: ObjectId;
  imageUrl: string;
  result: Identification;
  userId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

export type IdentificationModelCreateInput = Omit<IdentificationModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_IDENTIFICATION = "Identifications";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getIdentifications = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_IDENTIFICATION)
    .find({})

    .project({ password: 0 })
    .toArray()) as IdentificationModel[];

  return users;
};

export const requestIdentification = async (
  identification: IdentificationModelCreateInput
) => {
  //   const modifiedIdentification: IdentificationModelCreateInput = {
  //     ...identification,
  //     // password: hashText(user.password),
  //   };
  //   const db = await getDb();
  //   const result = await db
  //     .collection(COLLECTION_IDENTIFICATION)
  //     .insertOne(modifiedIdentification);
  //   return result;
};

export const saveIdentification = async (
  identification: IdentificationModelCreateInput
) => {
  const modifiedIdentification: IdentificationModelCreateInput = {
    ...identification,
    // password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db
    .collection(COLLECTION_IDENTIFICATION)
    .insertOne(modifiedIdentification);

  return result;
};
