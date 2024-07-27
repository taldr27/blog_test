import { PostWithProfile } from "../types/types";
import InputBox from "./InputBox";
import Separator from "./Separator";
import YourPosts from "./YourPosts";

export default function AddNewPost({
  userPosts,
}: Readonly<{ userPosts: PostWithProfile[] | null }>) {
  return (
    <div className="w-full flex items-start gap-20 flex-col min-h-[450px]">
      <InputBox content="What do you want to write?" cta="Add New Post +" />
      {userPosts && userPosts.length > 0 ? (
        <div className="w-full">
          <Separator title="Your latest posts" />
          <YourPosts filteredPosts={userPosts} />
        </div>
      ) : null}
    </div>
  );
}
