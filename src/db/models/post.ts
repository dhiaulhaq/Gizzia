import { ObjectId } from "mongodb";
import { getDb } from "../config/connection";
import { PostModel } from "@/@types/types.def";

export const createPost = async (
  post: Omit<PostModel, "_id" | "createdAt" | "updatedAt">
) => {
  const db = await getDb();
  const newPost = { ...post, createdAt: new Date(), updatedAt: new Date() };
  const result = await db.collection("Posts").insertOne(newPost);
  return result.insertedId;
};

export const getPosts = async (title?: string, category?: string) => {
  const db = await getDb();
  const filter: any = {};
  if (title) filter.title = { $regex: title, $options: "i" };
  if (category) filter.category = category;

  return await db
    .collection("Posts")
    .aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "Likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "Comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          title: 1,
          content: 1,
          category: 1,
          imageUrl: 1,
          createdAt: 1,
          updatedAt: 1,
          likesCount: { $size: "$likes" },
          comments: 1,
          "user._id": 1,
          "user.name": 1,
          "user.username": 1,
          "user.email": 1,
        },
      },
    ])
    .toArray();
};

export const getPostById = async (id: string) => {
  const db = await getDb();
  return await db
    .collection("Posts")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "Likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "Comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          title: 1,
          content: 1,
          category: 1,
          imageUrl: 1,
          createdAt: 1,
          updatedAt: 1,
          likesCount: { $size: "$likes" },
          comments: 1,
          "user._id": 1,
          "user.name": 1,
          "user.username": 1,
          "user.email": 1,
        },
      },
    ])
    .next();
};
