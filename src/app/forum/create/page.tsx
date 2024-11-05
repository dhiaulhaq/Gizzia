"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const categories = [
  "Health",
  "Nutrition",
  "Fitness",
  "Lifestyle",
  "Recipe",
  "Other",
];

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/forum");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8ffe6] p-10 py-12 px-4">
      <div className="container mx-auto px-4 py-8">
        <Link href="/forum">
          <Button variant="ghost" className="mb-4 text-gray-900">
            ← Back to Forum
          </Button>
        </Link>

        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl text-black font-bold mb-6">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-gray-200 text-black border-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger className="bg-gray-200 text-gray-400">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      className="bg-gray-200 text-black cursor-pointer hover:text-gray-600"
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="min-h-[200px] bg-gray-200 text-black border-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="bg-gray-200 text-black border-gray-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <Button type="submit" className="w-full bg-[#1B2E20]">
              Create Post
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
