import Image from "next/image";
import DateConverter from "../utils/DateConverter";

export default function CommentBody({
  name,
  content,
  date,
  avatar_url,
  image_url,
}: Readonly<{
  name: string;
  content: string;
  date: string;
  avatar_url: string;
  image_url: string | null;
}>) {
  const commentDate = DateConverter(date);
  return (
    <div className="w-full bg-[#222222] rounded-xl p-6 flex gap-5 items-start">
      <div className="flex">
        <Image
          src={avatar_url}
          alt="github avatar"
          className="rounded-3xl"
          width={50}
          height={50}
        />
      </div>
      <div className="text-lg">
        <div className="flex flex-col">
          <span className="leading-[22px]">{name}</span>
          <span className="text-sm text-[#979797]">{commentDate}</span>
        </div>
        <p className="leading-7 mt-3">{content}</p>
        {image_url && (
          <Image
            src={image_url}
            alt="comment image"
            width={402}
            height={265}
            className="mt-3"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
