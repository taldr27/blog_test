import PostsBody from "./PostsBody";

export default function PostsComponent({
  posts,
  isSmall = false,
}: Readonly<{ posts: any[] | null; isSmall?: boolean }>) {
  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ${
        !isSmall ? "md:grid-cols-3" : ""
      }`}
    >
      {posts?.map((post) => (
        <PostsBody key={post.id} post={post} />
      ))}
    </div>
  );
}
