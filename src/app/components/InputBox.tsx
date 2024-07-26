"use client";

import { useRef, useState } from "react";
import { addPost } from "../actions/actions";

export default function InputBox({
  content,
  cta,
}: Readonly<{ content: string; cta: string }>) {
  const ref = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        if (image) formData.append("image", image);
        try {
          await addPost(formData);
          ref.current?.reset();
          setImage(null);
        } catch (error) {
          setError((error as Error).message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }}
      className="bg-[#121212] p-4 rounded-md w-full max-w-lg mx-auto min-h-[411px] flex flex-col space-y-3"
    >
      <div>
        <label className="" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full mb-5 bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <label className="" htmlFor="content">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          rows={7}
          placeholder={content}
          className="w-full bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500"
        />
      </div>
      <div className="flex justify-between items-center flex-wrap gap-5 md:gap-0">
        <input
          type="file"
          id="file-input"
          className="max-w-80"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="bg-black text-white px-4 py-2 flex-1 rounded-md hover:bg-gray-900 focus:outline-none">
          {cta}
        </button>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
}
