import { NextRequest, NextResponse } from "next/server";
import { getLikeByPostIdAndUserId, deleteLikeById } from "@/db/models/like";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const user = req.headers.get("x-user-id") as string;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAuthorized = await getLikeByPostIdAndUserId(id, user);
  if (!isAuthorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await deleteLikeById(id, user.toString());
    return NextResponse.json(
      {
        statusCode: 200,
        message: "Successfully deleted like!",
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
        error: "Failed to delete like",
      },
      {
        status: 500,
      }
    );
  }
};
