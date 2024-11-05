import { NextRequest, NextResponse } from "next/server";
import { addLike } from "@/db/models/like";
import { getUser } from "@/lib/jwt";
import { ObjectId } from "mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = params.id;
  const message = await addLike(postId, user.id as string);
  return NextResponse.json({ message });
}
