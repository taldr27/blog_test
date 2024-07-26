"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post, PostWithProfile } from "../types/types";

export default function PostsBody({ post }: { post: PostWithProfile }) {
  const router = useRouter();
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

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
      className="w-full max-w-[470px] min-h-[144px] cursor-pointer"
      onClick={handleSeeMore}
    >
      <div className="flex flex-col lg:flex-row justify-normal lg:justify-between lg:items-center">
        <span className="text-base text-[#848285]">{date}</span>
        <div className="flex items-center gap-1">
          <span>@{post.profile.user_name} </span>
          <Image
            src={post.profile.avatar_url ?? "/next.svg"}
            alt="github avatar"
            width={30}
            height={30}
            className="rounded-3xl"
          />
        </div>
      </div>
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
