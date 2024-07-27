import { CommentWithProfile } from "../types/types";
import CommentBody from "./CommentBody";
import InputBox from "./InputBox";
import Separator from "./Separator";

export default function CommentsComponent({
  postId,
  comments,
}: Readonly<{ postId: string; comments: CommentWithProfile[] }>) {
  return (
    <>
      <div className="mb-12">
        <Separator title="Comments" />
        <InputBox
          content="Write a comment..."
          cta="Post Comment"
          isCommentBox
          rows={4}
          postId={postId}
        />
      </div>
      {comments.length > 0 ? (
        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <CommentBody
              key={comment.id}
              name={comment.profile.full_name!}
              content={comment.content}
              date={comment.created_at}
              avatar_url={comment.profile.avatar_url!}
              image_url={comment.image_url}
            />
          ))}
        </div>
      ) : (
        <p className="text-2xl">No comments available yet...</p>
      )}
    </>
  );
}
