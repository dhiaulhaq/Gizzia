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
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useDebounce } from "@/hooks/useDebounce";
import { PostModel } from "@/@types/types.def";

const categories = [
  "Technology",
  "Gaming",
  "Sports",
  "Music",
  "Movies",
  "Other",
];

export default function ForumPage() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all"); // Default to 'all' to show all categories by default
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
    <div className="container mx-auto px-4 py-8">
      {/* Header and search inputs */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>{" "}
            {/* Change here */}
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Render posts */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onLikeToggle={fetchPosts} />
        ))}
      </div>
    </div>
  );
}
