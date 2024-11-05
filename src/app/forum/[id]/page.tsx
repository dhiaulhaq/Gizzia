"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";
import { PostModel } from "@/@types/types.def";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostModel | null>(null);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    const response = await fetch(`/api/posts/${params.id}`);
    const data = await response.json();
    setPost(data);
  };

  const handleLike = async () => {
    await fetch(`/api/posts/${params.id}/likes`, { method: "POST" });
    fetchPost();
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${params.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    });
    setComment("");
    fetchPost();
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/forum">
        <Button variant="ghost" className="mb-4">
          ← Back to Forum
        </Button>
      </Link>

      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage
              src={`https://avatar.vercel.sh/${post.user.username}`}
            />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              Posted by {post.user.name} •{" "}
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>
        </div>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded-lg mb-4"
          />
        )}

        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleLike}>
            <Heart
              className={`mr-2 h-4 w-4 ${post.isLiked ? "fill-red-500" : ""}`}
            />
            {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
          </Button>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">{post.comments.length} comments</span>
        </div>
      </Card>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <form onSubmit={handleComment} className="mb-6">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" disabled={!comment.trim()}>
            Post Comment
          </Button>
        </form>

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <Card key={comment._id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.userId}`}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="whitespace-pre-wrap">{comment.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
