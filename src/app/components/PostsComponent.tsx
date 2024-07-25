import PostsBody from "./PostsBody";

export default function PostsComponent({
  posts,
}: Readonly<{ posts: any[] | null }>) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts?.map((post) => (
        <PostsBody key={post.id} post={post} />
      ))}
    </div>
  );
}
