import { NextRequest, NextResponse } from "next/server";
import {
  getCommentsByPostId,
  createComment,
  CommentModelCreateInput,
} from "@/db/models/comment";
import { ObjectId } from "mongodb";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const user = req.headers.get("x-user-id") as string;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const comments = await getCommentsByPostId(id as string);
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Success fetch comments!",
        data: comments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const user = req.headers.get("x-user-id") as string;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();
    const newComment: CommentModelCreateInput = {
      postId: new ObjectId(id as string),
      userId: new ObjectId(user as string),
      content,
    };
    const result = await createComment(newComment);
    return NextResponse.json(
      {
        statusCode: 201,
        message: "Successfully comment the post!",
        data: result,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to commenting post",
      },
      {
        status: 500,
      }
    );
  }
};
