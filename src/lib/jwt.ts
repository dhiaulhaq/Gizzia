import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const secret = process.env.SECRET || "SEBUT AKU TAMPAN";

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret);
  const verify = await jose.jwtVerify<T>(token, secretKey);

  return verify.payload;
};

export const getUser = async (
  request: NextRequest
): Promise<{ id: string } | null> => {
  const token = request.cookies.get("token")?.value;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjgzMTZkM2U0YzY5MjMzYTMwZDZlZSIsImVtYWlsIjoibmF1ZmFsQG1haWwuY29tIiwiaWF0IjoxNzMwNzg4ODE0fQ.DarhioY0pD0n7ftNa8PR06gt_nERMDQSibsh0kHgT0Q";
  if (!token) return null;
  try {
    const payload = await verifyTokenJose(token);

    return { id: payload.id as string };
  } catch {
    return null;
  }
};
