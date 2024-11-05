import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/forum")) {
    // if (
    //   request.url.includes("/api/forum") ||
    //   request.url.includes("/api/users")
    // ) {
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  if (request.url.includes("/forum") || request.url.includes("/profile")) {
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    return NextResponse.next();
  }

  return NextResponse.next();
};
