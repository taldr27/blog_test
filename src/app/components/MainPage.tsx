import PostsComponent from "./PostsComponent";
import Separator from "./Separator";
import AddNewPost from "./AddNewPost";

export default function MainPage({ user, posts, userPosts }: any) {
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
