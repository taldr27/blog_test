import CommentsComponent from "@/app/components/CommentsComponent";
import Separator from "@/app/components/Separator";
import { Database } from "@/app/types/supabase";
import { PostWithComments } from "@/app/types/types";
import DateConverter from "@/app/utils/DateConverter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function PostDetails({
  params,
}: Readonly<{ params: { postid: string } }>) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: postData } = await supabase
    .from("posts")
    .select("*, profile:profiles(*), comments:comments(*, profile:profiles(*))")
    .eq("id", params.postid)
    .single();

  const post = postData as PostWithComments;
  const postDate = DateConverter(post.created_at);

  return (
    <div className="w-full max-w-[840px] px-2 md:px-8 flex flex-col mx-auto min-h-[calc(100vh-296px)]">
      <div className="flex flex-col justify-center mb-32">
        <Separator title={post.title} customFont="50" />
        <div className="flex justify-between items-center  mb-8">
          <span className="text-[#B6B4B5]">{postDate}</span>
          <div className="flex gap-2 items-center">
            <span>Author: @{post.profile.user_name}</span>
            <a
              target="_blank"
              href={`https://github.com/${post.profile.user_name}`}
            >
              <Image
                src={post.profile.avatar_url!}
                alt="github icon"
                className="rounded-3xl"
                width={30}
                height={30}
                quality={50}
              />
            </a>
          </div>
        </div>
        {post.image_url && (
          <Image
            src={post.image_url}
            alt="post image"
            className="max-h-[550px] mb-12"
            width={776}
            height={550}
            quality={30}
            priority
          />
        )}
        <p className="text-lg leading-7 whitespace-pre-wrap">{post.content}</p>
      </div>
      <CommentsComponent postId={post.id} comments={post.comments} />
    </div>
  );
}
