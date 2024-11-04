import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";

export type CommentModel = {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CommentModelCreateInput = Omit<CommentModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_COMMENT = "Comments";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getComments = async () => {
  const db = await getDb();

  const comments = (await db
    .collection(COLLECTION_COMMENT)
    .find({})
    .toArray()) as CommentModel[];

  return comments;
};

export const createComment = async (comment: CommentModelCreateInput) => {
  const commentInsert: CommentModelCreateInput = {
    ...comment,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db
    .collection(COLLECTION_COMMENT)
    .insertOne(commentInsert);

  return result;
};

export const deleteCommentById = async (postId: string, userId: string) => {
  const db = await getDb();

  const commentFound = await db
    .collection(COLLECTION_COMMENT)
    .find({ postId: new ObjectId(postId), userId: new ObjectId(userId) })
    .toArray();

  if (commentFound.length === 0) throw new Error("Not Found");

  await db.collection(COLLECTION_COMMENT).deleteOne({
    postId: new ObjectId(postId),
    userId: new ObjectId(userId),
  });

  return `Comment removed from post`;
};
