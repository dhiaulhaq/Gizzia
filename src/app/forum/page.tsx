"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search, MessageSquare } from "lucide-react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useDebounce } from "@/hooks/useDebounce";
import { PostModel } from "@/@types/types.def";

const categories = [
  "Health",
  "Nutrition",
  "Fitness",
  "Lifestyle",
  "Recipe",
  "Other",
];

export default function ForumPage() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchPosts = async () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("title", debouncedSearch);
    if (category && category !== "all") params.append("category", category);

    const response = await fetch(`/api/posts?${params.toString()}`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [debouncedSearch, category]);

  return (
    <main className="min-h-screen bg-[#f8ffe6] p-10 py-12 px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-12 w-12 text-black" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Community Forum
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Join the discussion and share your thoughts
        </p>
        <Link href="/forum/create">
          <Button type="submit" className="bg-[#1B2E20]">
            + Add New Post
          </Button>
        </Link>
      </div>
      <div className="container mx-auto px-4">
        {/* Header and search inputs */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search posts..."
              className="pl-10 bg-gray-200 text-black border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-[#1B2E20]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1B2E20]">
              <SelectItem
                className="cursor-pointer hover:text-gray-300"
                value="all"
              >
                All Categories
              </SelectItem>{" "}
              {/* Change here */}
              {categories.map((cat) => (
                <SelectItem
                  key={cat}
                  className="cursor-pointer hover:text-gray-300"
                  value={cat}
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Render posts */}
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} onLikeToggle={fetchPosts} />
          ))}
        </div>
      </div>
    </main>
  );
}
