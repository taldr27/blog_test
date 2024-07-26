import { PostWithProfile } from "../types/types";
import InputBox from "./InputBox";
import Separator from "./Separator";
import YourPosts from "./YourPosts";

export default function AddNewPost({
  userPosts,
}: Readonly<{ userPosts: PostWithProfile[] | null }>) {
  return (
    <div className="w-full flex items-start gap-10 flex-col lg:flex-row min-h-[450px]">
      <InputBox content="What do you want to write?" cta="Add New Post" />
      <div>
        <Separator title="Your last 4 posts" />
        <YourPosts filteredPosts={userPosts} />
      </div>
    </div>
  );
}
