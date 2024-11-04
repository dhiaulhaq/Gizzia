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

export const getCommentsByPostId = async (postId: string) => {
  const db = await getDb();

  const commentFound = await db
    .collection(COLLECTION_COMMENT)
    .find({ postId: new ObjectId(postId) })
    .toArray();

  return commentFound;
};

export const getCommentByPostIdAndUserId = async (
  postId: string,
  userId: string
) => {
  const db = await getDb();
  const postObjectId = new ObjectId(postId);
  const userObjectId = new ObjectId(userId);

  const agg = [{ $match: { postId: postObjectId, userId: userObjectId } }];

  const post = await db.collection(COLLECTION_COMMENT).aggregate(agg).toArray();
  return post[0] as CommentModel;
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

export const deleteCommentById = async (id: string, userId: string) => {
  const db = await getDb();

  const commentFound = await db
    .collection(COLLECTION_COMMENT)
    .find({ _id: new ObjectId(id), userId: new ObjectId(userId) })
    .toArray();

  if (commentFound.length === 0) throw new Error("Not Found");

  await db.collection(COLLECTION_COMMENT).deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  });

  return `Comment removed from post`;
};
