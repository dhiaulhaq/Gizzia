import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

type PostCardProps = {
  post: any;
  onLikeToggle: () => void;
};

export default function PostCard({ post, onLikeToggle }: PostCardProps) {
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${post._id}/likes`, { method: "POST" });
    onLikeToggle();
  };

  return (
    <Link href={`/forum/${post._id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow">
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
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <p className="mb-4 line-clamp-3">{post.content}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <Heart
              className={`mr-2 h-4 w-4 ${post.isLiked ? "fill-red-500" : ""}`}
            />
            {post.likesCount}
          </button>
          <div className="flex items-center text-gray-500">
            <MessageSquare className="mr-2 h-4 w-4" />
            {post.comments.length}
          </div>
          <span className="text-sm text-gray-500 ml-auto">{post.category}</span>
        </div>
      </Card>
    </Link>
  );
}
