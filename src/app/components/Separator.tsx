export default function Separator({
  title,
  customFont = "44",
}: Readonly<{ title: string; customFont?: string }>) {
  return (
    <>
      <span
        className={`font-bold mb-4 leading-[64px] break-words`}
        style={{ fontSize: `${customFont}px` }}
      >
        {title}
      </span>
      <hr className="max-w-32 mb-10" />
    </>
  );
}
