"use client";

import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ user }: { user: User | null }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="flex justify-between max-w-[1200px] mx-auto p-5">
      <Image
        src="/static/images/vercel.svg"
        alt="logo"
        width={64}
        height={64}
      />
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <li onClick={handleSignOut}>Sign Out</li>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
