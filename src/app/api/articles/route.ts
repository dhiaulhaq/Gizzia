import { NextRequest, NextResponse } from "next/server";
import { getArticles, createArticle } from "@/db/models/article";

export async function GET(req: NextRequest) {
    try {
        const articles = await getArticles();
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, content, imageUrl, category, tags, UserId } = await req.json();

        if (!title || !content || !imageUrl || !category || !tags || !UserId) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newArticle = await createArticle({ title, content, imageUrl, category, tags, UserId });
        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
    }
}
