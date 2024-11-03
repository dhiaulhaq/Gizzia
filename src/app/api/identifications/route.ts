import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser } from "@/db/models/user";
import { MyResponse } from "@/@types/types.def";

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
