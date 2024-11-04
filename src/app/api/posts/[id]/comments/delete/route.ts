import { NextRequest, NextResponse } from "next/server";
import { deleteCommentById } from "@/db/models/comment";

export const DELETE = async (req: NextRequest) => {
  const user = req.headers.get("x-user-id") as string;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { commentId } = await req.json();
    const result = await deleteCommentById(commentId, user.toString());
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Successfully deleted comment!",
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
        error: "Failed to delete comment",
      },
      {
        status: 500,
      }
    );
  }
};
