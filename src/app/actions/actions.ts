"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addPost = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    const supabase = createServerActionClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    let imageUrl = "";

    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blog_images")
        .upload(`posts/${user.id}/${imageFile.name}`, imageFile);

      if (uploadError) {
        console.error("Error uploading image", uploadError);
        throw new Error("Error uploading image");
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("blog_images")
        .getPublicUrl(uploadData?.path || "");

      imageUrl = publicUrl || "";
    }

    const { error } = await supabase
      .from("posts")
      .insert({ title, content, profile_id: user.id, image_url: imageUrl });

    if (error) {
      console.error("Error adding new post", error);
      throw new Error("Error adding new post");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Unexpected error", error);
    throw new Error("Unexpected error");
  }
};
