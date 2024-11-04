import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getUserByEmail } from "@/db/models/user";
import { signToken } from "@/lib/jwt";
import { compare } from "bcryptjs";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${encodeURIComponent(
        errFinalMessage
      )}`
    );
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !compare(parsedData.data.password, user.password)) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${encodeURIComponent(
        "Invalid Username or Password"
      )}`
    );
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = signToken(payload);

  // const response = NextResponse.redirect(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/`
  // );

  // response.cookies.set("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
  //   sameSite: "strict",
  // });

  const result = NextResponse.json({
    token,
  });

  return result;
};
