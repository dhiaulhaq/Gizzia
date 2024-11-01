import { NextRequest, NextResponse } from "next/server";
import { requestHealth } from "@/db/models/health";
import { HealthParameters } from "@/db/models/health";

export async function POST(req: NextRequest) {
  try {
    const health: HealthParameters = await req.json();

    const analysisResult = await requestHealth(health);

    console.log(analysisResult);

    return NextResponse.json({
      status: "success",
      data: JSON.parse(analysisResult),
    });
  } catch (error) {
    console.error("Error in requestHealth API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
