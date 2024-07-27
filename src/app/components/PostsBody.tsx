"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PostWithProfile } from "../types/types";
import { DateConverter } from "../utils/DateConverter";

export default function PostsBody({
  post,
}: Readonly<{ post: PostWithProfile }>) {
  const router = useRouter();
  const date = DateConverter(post.created_at);

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
      className="w-full min-h-[144px] cursor-pointer border border-1 rounded-2xl border-[#5E5E5E] p-6 flex flex-col justify-between hover:bg-[#0d0d0d] transition-all duration-500"
      onClick={handleSeeMore}
    >
      <div>
        <div className="flex flex-col lg:flex-row justify-normal lg:justify-between lg:items-center">
          <span className="text-base text-[#848285]">{date}</span>
        </div>
        <div className="text-lg">
          <span className="font-bold break-words">{post.title}</span>
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
      <div className="flex items-center gap-2 mt-2">
        <Image
          src={post.profile.avatar_url ?? "/next.svg"}
          alt="github avatar"
          width={30}
          height={30}
          className="rounded-3xl"
        />
        <span>@{post.profile.user_name} </span>
      </div>
    </div>
  );
}
