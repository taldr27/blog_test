"use client";

import { useRef, useState } from "react";
import { addComment, addPost } from "../actions/actions";

export default function InputBox({
  content,
  cta,
  isCommentBox = false,
  rows = 7,
  postId,
}: Readonly<{
  content: string;
  cta: string;
  isCommentBox?: boolean;
  rows?: number;
  postId?: string;
}>) {
  const ref = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      const formData = new FormData(ref.current);
      if (image) formData.append("image", image);
      if (isCommentBox) {
        try {
          setLoading(true);
          formData.append("postId", postId as string);
          await addComment(formData);
          setSuccess("Comment added successfully!");
          ref.current.reset();
          setImage(null);
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        } catch (error) {
          setError((error as Error).message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          await addPost(formData);
          setSuccess("Post added successfully!");
          ref.current.reset();
          setImage(null);
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        } catch (error) {
          setError((error as Error).message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] p-6 rounded-md max-w-lg min-w-full mx-auto w-full flex flex-col space-y-3"
    >
      <div>
        {!isCommentBox ? (
          <>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full mb-5 bg-[#0d0d0d] text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007aff]"
              required
            />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              rows={rows}
              placeholder={content}
              className="w-full bg-[#0d0d0d] text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-500"
            />
          </>
        ) : (
          <textarea
            id="content"
            name="content"
            rows={rows}
            placeholder={content}
            className="w-full bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-500"
          />
        )}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-5 md:gap-0">
        <input
          type="file"
          id="file-input"
          className="max-w-80"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button
          type="submit"
          className="cursor-pointer bg-[#007aff] rounded-3xl py-2 px-4 hover:bg-[#4294ec]"
        >
          {loading ? "Loading..." : cta}
        </button>
      </div>
      {success && <span className="text-green-500">{success}</span>}
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
}
