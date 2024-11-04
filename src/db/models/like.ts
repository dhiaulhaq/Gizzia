import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";

export type LikeModel = {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type LikeModelCreateInput = Omit<LikeModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_LIKE = "Likes";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getLikes = async () => {
  const db = await getDb();

  const likes = (await db
    .collection(COLLECTION_LIKE)
    .find({})
    .toArray()) as LikeModel[];

  return likes;
};

export const getLikesByPostId = async (postId: string) => {
  const db = await getDb();

  const likeFound = await db
    .collection(COLLECTION_LIKE)
    .find({ postId: new ObjectId(postId) })
    .toArray();

  return likeFound;
};

export const getLikeByPostIdAndUserId = async (
  postId: string,
  userId: string
) => {
  const db = await getDb();
  const postObjectId = new ObjectId(postId);
  const userObjectId = new ObjectId(userId);

  const agg = [{ $match: { postId: postObjectId, userId: userObjectId } }];

  const post = await db.collection(COLLECTION_LIKE).aggregate(agg).toArray();
  return post[0] as LikeModel;
};

export const createLike = async (like: LikeModelCreateInput) => {
  const likeInsert: LikeModelCreateInput = {
    ...like,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_LIKE).insertOne(likeInsert);

  return result;
};

export const deleteLikeById = async (postId: string, userId: string) => {
  const db = await getDb();

  const likeFound = await db
    .collection(COLLECTION_LIKE)
    .find({ postId: new ObjectId(postId), userId: new ObjectId(userId) })
    .toArray();

  if (likeFound.length === 0) throw new Error("Not Found");

  await db.collection(COLLECTION_LIKE).deleteOne({
    postId: new ObjectId(postId),
    userId: new ObjectId(userId),
  });

  return `Like removed from post`;
};
