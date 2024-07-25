import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1289px] mx-8 flex flex-col justify-center">
        <Navbar user={user} />
        <MainPage user={user} />
      </div>
    </div>
  );
}
