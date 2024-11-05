import { NextResponse } from "next/server";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";
import { hashText } from "../utils/hash";

export type UserModel = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
  gender?: string;
  dateOfBirth?: string;
  imageProfileUrl?: string;
  createdAt?: string;
  updatedtedAt?: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_USER = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find({})

    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (user: UserModelCreateInput) => {
  const modifiedUser: UserModelCreateInput = {
    ...user,
    password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const userWithPosts = await db
    .collection(COLLECTION_USER)
    .aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "Posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $unwind: {
          path: "$posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "Likes",
          localField: "posts._id",
          foreignField: "postId",
          as: "posts.likes",
        },
      },
      {
        $lookup: {
          from: "Comments",
          localField: "posts._id",
          foreignField: "postId",
          as: "posts.comments",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          username: { $first: "$username" },
          email: { $first: "$email" },
          gender: { $first: "$gender" },
          dateOfBirth: { $first: "$dateOfBirth" },
          imageProfileUrl: { $first: "$imageProfileUrl" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          posts: { $push: "$posts" },
        },
      },
      {
        $project: {
          password: 0,
          updatedAt: 0,
        },
      },
    ])
    .toArray();

  return userWithPosts[0] || null;
};

export const updateUser = async (id: string, req: Request) => {
  try {
    const db = await getDb();
    const objectId = new ObjectId(id);

    const body = (await req.json()) as Partial<UserModel>;
    const { name, username, email, gender, dateOfBirth, imageProfileUrl } =
      body;

    const result = await db.collection(COLLECTION_USER).updateOne(
      { _id: objectId },
      {
        $set: {
          name,
          username,
          email,
          gender,
          dateOfBirth,
          imageProfileUrl,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await db
      .collection(COLLECTION_USER)
      .findOne({ _id: objectId }, { projection: { password: 0 } });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as UserModel;

  return user;
};

export const getUserByUsername = async (username: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ username: username })) as UserModel;

  return user;
};
