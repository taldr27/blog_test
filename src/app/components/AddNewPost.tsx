import InputBox from "./InputBox";
import Separator from "./Separator";
import YourPosts from "./YourPosts";

export default function AddNewPost({
  userPosts,
}: Readonly<{ userPosts: any[] }>) {
  return (
    <div className="w-full flex items-start gap-10 flex-col lg:flex-row">
      <InputBox content="What do you want to write?" cta="Add New Post" />
      <div>
        <Separator title="Your last 4 posts" />
        <YourPosts filteredPosts={userPosts} />
      </div>
    </div>
  );
}