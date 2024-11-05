import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/db/models/comment";
import { getUser } from "@/lib/jwt";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const postId = params.id;
  const { content } = await request.json();
  const commentId = await addComment(postId, user.id, content);
  return NextResponse.json({ _id: commentId });
}
