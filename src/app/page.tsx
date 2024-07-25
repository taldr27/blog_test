import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) redirect("/login");
  return (
    <div>
      <Navbar user={user} />
      <h1>Home</h1>
    </div>
  );
}
