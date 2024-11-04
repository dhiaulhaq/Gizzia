import { NextRequest, NextResponse } from "next/server";
import { getLikesByPostId, createLike } from "@/db/models/like";
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
    const likes = await getLikesByPostId(id as string);
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Success fetch likes!",
        data: likes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Failed to fetch likes",
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
    const result = await createLike({
      postId: new ObjectId(id as string),
      userId: new ObjectId(user as string),
    });
    return NextResponse.json(
      {
        statusCode: 201,
        message: "Successfully liked the post!",
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
        error: "Failed to like post",
      },
      {
        status: 500,
      }
    );
  }
};
