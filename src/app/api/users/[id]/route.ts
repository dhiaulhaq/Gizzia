import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser } from "@/db/models/user";
import { MyResponse } from "../../types.def";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const user = await getUserById(id);

  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Fetching user ${user.username} success!`,
    data: user,
  });
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await updateUser(params.id, req);

    return response;
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
