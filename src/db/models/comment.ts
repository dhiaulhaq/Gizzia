import { ObjectId } from "mongodb";
import { getDb } from "../config/connection";
import { CommentModel } from "@/@types/types.def";

export const addComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  const db = await getDb();
  const newComment = {
    postId: new ObjectId(postId),
    userId: new ObjectId(userId),
    content,
    createdAt: new Date(),
  };
  const result = await db.collection("Comments").insertOne(newComment);
  return result.insertedId;
};
