import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PostsComponent from "./PostsComponent";
import YourPosts from "./YourPosts";
import Separator from "./Separator";
import InputBox from "./InputBox";
import AddNewPost from "./AddNewPost";

export default async function MainPage({ user }: any) {
  const supabase = createServerComponentClient({ cookies });
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
    <div className="max-w-[1200px] w-full self-center">
      <Separator title="Available Posts" />
      <PostsComponent posts={posts} />
      <div id="your-posts" className="mt-20">
        <Separator title="Your Posts" />
        {user ? (
          <AddNewPost userPosts={userPosts} />
        ) : (
          <span className="block text-lg -mt-8">
            Log In to see your posts or add a new one...
          </span>
        )}
      </div>
    </div>
  );
}
