import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPosts } from "@/db/models/post";
import { PostModelCreateInput } from "@/db/models/post";
import { ObjectId } from "mongodb";

export const GET = async () => {
  try {
    const posts = await getPosts();
    return NextResponse.json({
      statusCode: 200,
      message: "Success fetch all data!",
      data: posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to fetch posts",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id") as string;
  if (!userId) {
    return NextResponse.json(
      {
        statusCode: 401,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { title, content, category, imageUrl } = await req.json();
    const newPost: PostModelCreateInput = {
      title,
      content,
      category,
      userId: new ObjectId(userId),
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createPosts(newPost);
    return NextResponse.json({
      statusCode: 201,
      message: "Post created successfully!",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to create post",
      },
      {
        status: 500,
      }
    );
  }
};
