export default function Separator({ title }: Readonly<{ title: string }>) {
  return (
    <>
      <span className="font-bold text-[44px] mb-4">{title}</span>
      <hr className="max-w-32 mb-10" />
    </>
  );
}
