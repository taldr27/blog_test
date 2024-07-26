import { type Database } from "./supabase";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type PostWithProfile = Post & {
  profile: Profile;
};

export type CommentWithProfile = Comment & {
  profile: Profile;
};
