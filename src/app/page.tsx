import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MainPage from "./components/MainPage";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("*, profile:profiles(*)")
    .order("created_at", { ascending: false });

  // TODO: I think I can filter posts to not repeat with the general posts section.
  let userPosts = [];
  if (user) {
    const { data: userPostsData } = await supabase
      .from("posts")
      .select("*, profile:profiles(*)")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(4);
    userPosts = userPostsData || [];
  }

  return (
    <div className="w-full max-w-[1289px] px-8 flex flex-col">
      <MainPage posts={posts} user={user} userPosts={userPosts} />
    </div>
  );
}
