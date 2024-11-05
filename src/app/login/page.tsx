import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

export default function LoginComponent() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

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

      return redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${errFinalMessage}`
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      cookies().set("token", data.token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        sameSite: "strict",
      });

      return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
    } else {
      throw new Error("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="absolute inset-0">
        <img
          src="/gizi-seimbang.jpg"
          alt="Balanced nutrition foods"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-8 bg-black bg-opacity-60">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-white">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-gray-300">
              Enter your Credentials to access your account
            </p>
          </div>

          <form action={handleFormAction} method="POST" className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  className="pl-10 h-12 text-white bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  className="pl-10 h-12 text-white bg-[#e7fadf] border border-gray-400 placeholder-gray-300 focus:ring-2 focus:ring-[#d0f5bb]"
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-700 hover:bg-green-600"
            >
              Login
            </Button>

            <div className="relative">
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-300">Or</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-300">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
