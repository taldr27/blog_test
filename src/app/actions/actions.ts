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
    return { success: false, error: "User not authenticated" };
  }

  return { success: true, user };
};

const uploadImage = async (
  userId: string,
  imageFile: File | null,
  folder: string
) => {
  if (!imageFile) return "";

  const timestamp = Date.now();
  const fileName = `${timestamp}_${imageFile.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("blog_images")
    .upload(`${folder}/${userId}/${fileName}`, imageFile);

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

  const authResult = await authenticateUser();
  if (!authResult.success) {
    return authResult;
  }
  const user = authResult.user;

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  if (!content && !imageFile) {
    return { success: false, error: "Post must have content or an image" };
  }

  const imageUrl = await uploadImage(user.id, imageFile, "posts");

  await insertData("posts", {
    title,
    content,
    profile_id: user.id,
    image_url: imageUrl,
  });
  revalidatePath("/");
  return { success: true, error: null };
};

export const addComment = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;
  const postId = formData.get("postId") as string;

  const authResult = await authenticateUser();
  if (!authResult.success) {
    return authResult;
  }
  const user = authResult.user;

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  if (!content && !imageFile) {
    return { success: false, error: "Comment must have content or an image" };
  }

  const imageUrl = await uploadImage(user.id, imageFile, "comments");

  await insertData("comments", {
    content,
    profile_id: user.id,
    image_url: imageUrl,
    post_id: postId,
  });

  revalidatePath(`/posts/${postId}`);
  return { success: true, error: null };
};
