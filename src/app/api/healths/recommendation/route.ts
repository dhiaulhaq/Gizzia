import { NextRequest, NextResponse } from "next/server";
import { requestRecommendation } from "@/db/models/health";

export async function POST(req: NextRequest) {
  try {
    const { summary } = await req.json();

    const recommendationResult = await requestRecommendation(summary);

    return NextResponse.json({
      status: "success",
      data: recommendationResult,
    });
  } catch (error) {
    console.error("Error in requestRecommendations API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
