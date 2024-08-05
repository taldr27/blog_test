"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PostWithProfile } from "../types/types";
import DateConverter from "../utils/DateConverter";

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
      <div className="flex items-center justify-between">
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
        {post.image_url && (
          <svg
            width="32px"
            height="30px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <title>The Post have an Attached Image</title>
            <defs>
              <style>{`.b{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;}`}</style>
            </defs>
            <path
              className="b"
              d="M29.4995,12.3739c.7719-.0965,1.5437,.4824,1.5437,1.2543h0l2.5085,23.8312c.0965,.7719-.4824,1.5437-1.2543,1.5437l-23.7347,2.5085c-.7719,.0965-1.5437-.4824-1.5437-1.2543h0l-2.5085-23.7347c-.0965-.7719,.4824-1.5437,1.2543-1.5437l23.7347-2.605Z"
            />
            <path
              className="b"
              d="M12.9045,18.9347c-1.7367,.193-3.0874,1.7367-2.8945,3.5699,.193,1.7367,1.7367,3.0874,3.5699,2.8945,1.7367-.193,3.0874-1.7367,2.8945-3.5699s-1.8332-3.0874-3.5699-2.8945h0Zm8.7799,5.596l-4.6312,5.6925c-.193,.193-.4824,.2894-.6754,.0965h0l-1.0613-.8683c-.193-.193-.5789-.0965-.6754,.0965l-5.0171,6.1749c-.193,.193-.193,.5789,.0965,.6754-.0965,.0965,.0965,.0965,.193,.0965l19.9719-2.1226c.2894,0,.4824-.2894,.4824-.5789,0-.0965-.0965-.193-.0965-.2894l-7.8151-9.0694c-.2894-.0965-.5789-.0965-.7719,.0965h0Z"
            />
            <path
              className="b"
              d="M16.2814,13.8211l.6754-6.0784c.0965-.7719,.7719-1.3508,1.5437-1.2543l23.7347,2.5085c.7719,.0965,1.3508,.7719,1.2543,1.5437h0l-2.5085,23.7347c0,.6754-.7719,1.2543-1.5437,1.2543l-6.1749-.6754"
            />
            <path
              className="b"
              d="M32.7799,29.9337l5.3065,.5789c.2894,0,.4824-.193,.5789-.4824,0-.0965,0-.193-.0965-.2894l-5.789-10.5166c-.0965-.193-.4824-.2894-.6754-.193h0l-.3859,.3859"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
