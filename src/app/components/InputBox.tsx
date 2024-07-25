export default function InputBox({
  content,
  cta,
}: Readonly<{ content: string; cta: string }>) {
  return (
    <div className="bg-[#121212] p-4 rounded-md w-full max-w-lg mx-auto">
      <label className="" htmlFor="title">
        Title:
      </label>
      <input
        id="title"
        type="text"
        className="w-full mb-5 bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <label className="" htmlFor="content">
        Content:
      </label>
      <textarea
        className="w-full bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-white"
        rows={7}
        placeholder={content}
      />
      <div className="flex justify-between items-center mt-2 flex-wrap gap-5 md:gap-0">
        <input
          type="file"
          id="file-input"
          className="max-w-80"
          accept="image/*"
        />
        <button className="bg-black text-white px-4 py-2 flex-1 rounded-md hover:bg-gray-900 focus:outline-none">
          {cta}
        </button>
      </div>
    </div>
  );
}
