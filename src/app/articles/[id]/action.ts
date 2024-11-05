"use server";

import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/db/models/article';

export async function handler(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Ambil ID dari URL

    // Cek apakah ID valid
    if (!id) {
        return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    try {
        // Ambil artikel berdasarkan ID
        const article = await getArticleById(id);
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error('Error fetching article:', error); // Log error untuk debugging
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
