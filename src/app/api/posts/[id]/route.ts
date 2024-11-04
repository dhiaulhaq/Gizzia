import { NextRequest, NextResponse } from "next/server";
import {
  getPostById,
  getPostByIdAndUserId,
  updatePostById,
  deletePostById,
  PostModelCreateInput,
} from "@/db/models/post";
import { ObjectId } from "mongodb";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    const post = await getPostById(id as string);
    return Response.json(
      {
        statusCode: 200,
        message: "Success fetch data!",
        data: post,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 404,
        error: "Post not found",
      },
      {
        status: 404,
      }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const user = req.headers.get("x-user-id") as string;
    if (!user)
      return NextResponse.json(
        {
          statusCode: 401,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    const postId = id as string;
    const isAuthorized = await getPostByIdAndUserId(postId, user);

    if (!isAuthorized)
      return NextResponse.json(
        {
          statusCode: 403,
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );

    const { title, content, category, imageUrl } = await req.json();
    const updatedData: PostModelCreateInput = {
      title,
      content,
      category,
      userId: new ObjectId(user),
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await updatePostById(postId, user, updatedData);

    return Response.json(
      {
        statusCode: 200,
        message: "Success update data!",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to update post",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const user = req.headers.get("x-user-id") as string;
    if (!user)
      return NextResponse.json(
        {
          statusCode: 401,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    const postId = id as string;
    const isAuthorized = await getPostByIdAndUserId(postId, user);
    if (!isAuthorized)
      return NextResponse.json(
        {
          statusCode: 403,
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );

    const result = await deletePostById(postId, user);
    return Response.json(
      {
        statusCode: 200,
        message: "Success delete data!",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to delete post",
      },
      {
        status: 500,
      }
    );
  }
};
