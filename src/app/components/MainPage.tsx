import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PostsComponent from "./PostsComponent";
import YourPosts from "./YourPosts";
import Separator from "./Separator";

export default async function MainPage({ user }: any) {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase.from("posts").select("*");

  // TODO: I think I can filter posts to not repeat with the general posts section.
  let userPosts = [];
  if (user) {
    const { data: userPostsData } = await supabase
      .from("posts")
      .select("*")
      .eq("profile_id", user.id);
    userPosts = userPostsData || [];
  }

  return (
    <div className="max-w-[1200px] w-full self-center">
      <Separator title="Available Posts" />
      <PostsComponent posts={posts} />
      <div id="your-posts" className="mt-20">
        <Separator title="Your Posts" />
        {user ? (
          <div className="w-full">
            <YourPosts filteredPosts={userPosts} />
          </div>
        ) : (
          <span className="block text-lg -mt-8">
            Log In to see your posts or add a new one...
          </span>
        )}
      </div>
    </div>
  );
}
