import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/db/models/post";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await getPostById(params.id);
  return post
    ? NextResponse.json(post)
    : NextResponse.json({ error: "Post not found" }, { status: 404 });
}
