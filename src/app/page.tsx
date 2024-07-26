import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MainPage from "./components/MainPage";
import { Database } from "./types/supabase";
import { PostWithProfile } from "./types/types";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: postsData } = await supabase
    .from("posts")
    .select("*, profile:profiles(*)")
    .order("created_at", { ascending: false });
  const posts: PostWithProfile[] = postsData as PostWithProfile[];

  // TODO: I think I can filter posts to not repeat with the general posts section.
  let userPosts: PostWithProfile[] = [];
  if (user) {
    const { data: userPostsData } = await supabase
      .from("posts")
      .select("*, profile:profiles(*)")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(4);
    userPosts = userPostsData as PostWithProfile[];
  }

  return (
    <div className="w-full max-w-[1289px] px-8 flex flex-col">
      <MainPage posts={posts} user={user} userPosts={userPosts} />
    </div>
  );
}
