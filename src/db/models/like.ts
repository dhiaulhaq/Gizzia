import { ObjectId } from "mongodb";
import { getDb } from "../config/connection";
import { LikeModel } from "@/@types/types.def";

export const removeLike = async (postId: string, userId: string) => {
  const db = await getDb();
  await db
    .collection("Likes")
    .deleteOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) });
  return "Like removed";
};

export const addLike = async (postId: string, userId: string) => {
  const db = await getDb();
  const like = await db
    .collection("Likes")
    .findOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) });
  if (like) {
    return removeLike(postId, userId as string);
  }

  await db
    .collection("Likes")
    .insertOne({ postId: new ObjectId(postId), userId: new ObjectId(userId) });
  return "Liked";
};
