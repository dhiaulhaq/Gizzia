import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";

export type ArticleModel = {
  _id: ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  UserId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_ARTICLES = "Articles";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getArticles = async () => {
  const db = await getDb();
  const articles = await db.collection(COLLECTION_ARTICLES).find().toArray();
  return articles.map((article) => ({
    _id: article._id as ObjectId,
    title: article.title as string,
    content: article.content as string,
    imageUrl: article.imageUrl as string,
    category: article.category as string,
    tags: article.tags as string[],
    UserId: article.UserId as ObjectId,
    createdAt: article.createdAt as string,
    updatedAt: article.updatedAt as string,
  }));
};

export const getArticleById = async (id: string) => {
  const db = await getDb();
  const article = await db.collection(COLLECTION_ARTICLES).findOne({
    _id: new ObjectId(id),
  });
  return article;
};

export const createArticle = async (
  articleData: Omit<ArticleModel, "_id" | "createdAt" | "updatedAt">
) => {
  const db = await getDb();
  const newArticle = {
    ...articleData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await db.collection(COLLECTION_ARTICLES).insertOne(newArticle);
  return result;
};

export const updateArticle = async (
  id: string,
  articleData: Partial<ArticleModel>
) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_ARTICLES).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...articleData,
        updatedAt: new Date().toISOString(),
      },
    }
  );
  return result;
};

export const deleteArticle = async (id: string) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_ARTICLES).deleteOne({
    _id: new ObjectId(id),
  });
  return result;
};
