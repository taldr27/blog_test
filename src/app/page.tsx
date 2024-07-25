import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MainPage from "./components/MainPage";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full max-w-[1289px] px-8 flex flex-col">
      <MainPage user={user} />
    </div>
  );
}
