"use client";

import { useRouter } from "next/navigation";

export default function PostsBody({ post }: any) {
  const router = useRouter();
  const date = new Date(post.created_at).toLocaleDateString("en-US");

  const isContentTooLong = post.content.length > 70;
  const contentToShow = isContentTooLong
    ? post.content.slice(0, 70) + "..."
    : post.content;

  const handleSeeMore = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      key={post.id}
      className="w-full max-w-[470px] min-h-[144px] max-h-[144px] cursor-pointer"
      onClick={handleSeeMore}
    >
      <span className="text-base text-[#848285]">{date}</span>
      <div className="text-lg">
        <span className="font-bold">{post.title}</span>
        <p className="text-[#848285]">
          {contentToShow}
          {isContentTooLong && (
            <button
              onClick={handleSeeMore}
              className="text-[#F5F5F5] hover:underline"
            >
              See more
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
