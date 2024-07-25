import PostsComponent from "./PostsComponent";

export default function YourPosts({
  filteredPosts,
}: Readonly<{
  filteredPosts: any[] | null;
}>) {
  return (
    <>
      {filteredPosts ? (
        <PostsComponent posts={filteredPosts} />
      ) : (
        <span>You have no posts...</span>
      )}
    </>
  );
}
