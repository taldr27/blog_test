"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const supabase = createServerActionClient({ cookies });

const authenticateUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }
  return user;
};

const uploadImage = async (
  userId: string,
  imageFile: File | null,
  folder: string
) => {
  if (!imageFile) return "";

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("blog_images")
    .upload(`${folder}/${userId}/${imageFile.name}`, imageFile);

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog_images").getPublicUrl(uploadData?.path || "");

  return publicUrl || "";
};

const insertData = async (table: string, data: any) => {
  const { error } = await supabase.from(table).insert(data);
  if (error) {
    console.error(`Error adding new ${table}`, error);
    throw new Error(`Error adding new ${table}: ${error.message}`);
  }
};

export const addPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  const user = await authenticateUser();

  if (!content && !imageFile) {
    throw new Error("Post must have content or an image");
  }

  const imageUrl = await uploadImage(user.id, imageFile, "posts");

  await insertData("posts", {
    title,
    content,
    profile_id: user.id,
    image_url: imageUrl,
  });
  revalidatePath("/");
};

export const addComment = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;
  const postId = formData.get("postId") as string;

  const user = await authenticateUser();

  if (!content && !imageFile) {
    throw new Error("Comment must have content or an image");
  }

  const imageUrl = await uploadImage(user.id, imageFile, "comments");

  await insertData("comments", {
    content,
    profile_id: user.id,
    image_url: imageUrl,
    post_id: postId,
  });

  revalidatePath(`/posts/${postId}`);
};
