import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts } from "@/db/models/post";
import { getUser } from "@/lib/jwt";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const user = await getUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const postId = await createPost({
    ...data,
    userId: new ObjectId(user.id as string),
  });
  return NextResponse.json({ _id: postId });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || undefined;
  const category = searchParams.get("category") || undefined;

  const posts = await getPosts(title, category);
  return NextResponse.json(posts);
}
