import { Heart, Search, ThumbsUp, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Component() {
  return (
    <>
      <div className="flex min-h-screen bg-[#e8f7de]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                className="w-full pl-8 border-black bg-gray-200 text-black placeholder:text-gray-500"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-black">CATEGORY</h2>
            <nav className="space-y-2">
              <a className="block text-gray-600 hover:text-gray-400" href="#">
                GIZI
              </a>
              <a className="block text-gray-600 hover:text-gray-400" href="#">
                NUTRITION
              </a>
              <a className="block text-gray-600 hover:text-gray-400" href="#">
                HEALTH
              </a>
            </nav>
          </div>

          {/* <div className="fixed bottom-4 flex space-x-4">
            <ThumbsUp className="h-5 w-5 text-gray-600" />
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <svg
                className=" h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <svg
                className=" h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Create Post */}
          <div className="mb-6 flex items-center gap-4 rounded-lg bg-white border border-gray-200 p-4">
            <Image
              alt="User avatar"
              className="h-10 w-10 rounded-full"
              height={40}
              src="/Image (1).png"
              width={40}
            />
            <Input
              className="flex-1 bg-gray-200 text-black placeholder:text-gray-500"
              placeholder="Let's share what going on your mind..."
            />
            <Button className="bg-[#113d1e] hover:bg-green-600">
              Create Post
            </Button>
          </div>

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
      </div>
    </>
  );
}
