import { Db, ObjectId, Filter } from "mongodb";
import { getMongoClientInstance } from "../config/connection";
import { LikeModel } from "./like";
import { CommentModel } from "./comment";

export type PostModel = {
  _id: ObjectId;
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
  userId: ObjectId;
  Likes: LikeModel[];
  Comments: CommentModel[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type PostModelCreateInput = Omit<
  PostModel,
  "_id" | "Likes" | "Comments"
>;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_POST = "Posts";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getPosts = async () => {
  const db = await getDb();

  const agg = [
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "postId",
        as: "Likes",
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "_id",
        foreignField: "postId",
        as: "Comments",
      },
    },
    {
      $unwind: {
        path: "$Likes",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$Comments",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const posts = (await db
    .collection(COLLECTION_POST)
    .aggregate(agg)
    .toArray()) as PostModel[];

  return posts;
};

export const createPosts = async (post: PostModelCreateInput) => {
  const postInsert: PostModelCreateInput = {
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_POST).insertOne(postInsert);

  return result;
};

export const getPostById = async (id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const agg = [
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "postId",
        as: "Likes",
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "_id",
        foreignField: "postId",
        as: "Comments",
      },
    },
    { $unwind: { path: "$Likes", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$Comments", preserveNullAndEmptyArrays: true } },
  ];

  const post = await db.collection(COLLECTION_POST).aggregate(agg).toArray();
  return post[0] as PostModel;
};

export const getPostByIdAndUserId = async (id: string, userId: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);
  const userObjectId = new ObjectId(userId);

  const agg = [
    { $match: { _id: objectId, userId: userObjectId } },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "postId",
        as: "Likes",
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "_id",
        foreignField: "postId",
        as: "Comments",
      },
    },
    { $unwind: { path: "$Likes", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$Comments", preserveNullAndEmptyArrays: true } },
  ];

  const post = await db.collection(COLLECTION_POST).aggregate(agg).toArray();
  return post[0] as PostModel;
};

export const getPostByCategory = async (category: string) => {
  const db = await getDb();

  const agg = [
    { $match: { category: category } },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "postId",
        as: "Likes",
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "_id",
        foreignField: "postId",
        as: "Comments",
      },
    },
    { $unwind: { path: "$Likes", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$Comments", preserveNullAndEmptyArrays: true } },
  ];

  const post = await db.collection(COLLECTION_POST).aggregate(agg).toArray();
  return post[0] as PostModel;
};

export const getPostsWithPaginationAndAggregates = async (
  limit: number,
  title?: string
) => {
  const db = await getDb();
  const filter: Filter<PostModel> = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  const agg = [
    { $match: filter },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "postId",
        as: "Likes",
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "_id",
        foreignField: "postId",
        as: "Comments",
      },
    },
    { $unwind: { path: "$Likes", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$Comments", preserveNullAndEmptyArrays: true } },
    { $limit: limit },
  ];

  const posts = await db.collection(COLLECTION_POST).aggregate(agg).toArray();
  return posts as PostModel[];
};

export const deletePostById = async (id: string, userId: string) => {
  const db = await getDb();

  const postFound = await db
    .collection(COLLECTION_POST)
    .find({ _id: new ObjectId(id), userId: new ObjectId(userId) })
    .toArray();

  if (postFound.length === 0) throw new Error("Not Found");

  await db.collection(COLLECTION_POST).deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  });

  return `Post Removed`;
};

export const updatePostById = async (
  postId: string,
  userId: string,
  updatedData: Partial<
    Omit<PostModel, "_id" | "userId" | "Likes" | "Comments" | "createdAt">
  >
) => {
  const db = await getDb();

  const postFound = await db
    .collection(COLLECTION_POST)
    .findOne({ _id: new ObjectId(postId), userId: new ObjectId(userId) });

  if (!postFound) {
    throw new Error("Post not found or you're not authorized to update it.");
  }

  const result = await db.collection(COLLECTION_POST).updateOne(
    { _id: new ObjectId(postId), userId: new ObjectId(userId) },
    {
      $set: {
        ...updatedData,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0
    ? "Post updated successfully."
    : "No changes were made.";
};
