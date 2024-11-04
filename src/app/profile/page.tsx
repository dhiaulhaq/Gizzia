"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  AtSign,
  Mail,
  Cake,
  MessageCircle,
  Activity,
  LogOut,
  Heart,
  ThumbsUp,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 ">User Profile</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Activity className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <Card className="relative shadow-lg rounded-lg bg-white border border-gray-200">
          <Link href="/profile/edit" passHref>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 relative overflow-hidden rounded-full shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500 transition-transform transform hover:scale-105">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                JD
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold text-gray-900">
              John Doe
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Name:</span>
              <span className="text-gray-700">John Doe</span>
            </div>
            <div className="flex items-center space-x-3">
              <AtSign className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Username:</span>
              <span className="text-gray-700">johndoe123</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Email:</span>
              <span className="text-gray-700">john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">Gender:</span>
              <span className="text-gray-700">Male</span>
            </div>
            <div className="flex items-center space-x-3">
              <Cake className="h-5 w-5 text-gray-500" />
              <span className="font-semibold text-[#000000]">
                Date of Birth:
              </span>
              <span className="text-gray-700">1990-01-15</span>
            </div>
          </CardContent>
        </Card>
        <main className="flex-1 p-6">
          {/* Feed */}
          <div className="space-y-6">
            {/* Post 1 */}
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="mb-4">
                <Image
                  alt="Gado-gado"
                  className="h-64 w-full rounded-lg object-cover"
                  height={256}
                  src="/gado1.jpg"
                  width={512}
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">Gado-gado</h2>
                <Heart className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  enak
                </span>
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  makanan
                </span>
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  gado
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <Image
                  alt="Pavel Gvay"
                  className="h-8 w-8 rounded-full"
                  height={32}
                  src="/Image (1).png"
                  width={32}
                />
                <span className="font-medium text-black">Pavel Gvay</span>
                <span className="text-sm text-gray-500">• 3 weeks ago</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> 651,324 Views
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> 36,654 Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> 56 Comments
                  </span>
                </div>
              </div>
            </div>

            {/* Post 2 */}
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="mb-4">
                <Image
                  alt="Gado-gado di GOP"
                  className="h-64 w-full rounded-lg object-cover"
                  height={256}
                  src="/gado2.webp"
                  width={512}
                />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">
                  gado-gado di GOP nih!!!
                </h2>
                <Heart className="h-5 w-5 text-orange-500" />
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  enak
                </span>
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  makanan
                </span>
                <span className="rounded-full bg-[#113d1e] px-3 py-1 text-sm text-white">
                  gado-gado
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <Image
                  alt="AR Jakir"
                  className="h-8 w-8 rounded-full"
                  height={32}
                  src="/Image (1).png"
                  width={32}
                />
                <span className="font-medium text-black">AR Jakir</span>
                <span className="text-sm text-gray-500">• 3 days ago</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> 244,564 Views
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> 10,920 Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> 184 Comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <button
                    className="fixed bottom-4 right-4 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-lg
                        hover:from-green-400 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
                    onClick={() => window.location.href = '/'}
                >
                    Back to Home
                </button> */}
      </div>
    </div>
  );
}
