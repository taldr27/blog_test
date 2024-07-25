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
    <nav className="flex justify-between h-20 items-center mb-[72px] bg-[#222222] rounded-2xl px-12 mt-8">
      <Image
        src="/static/images/logo.png"
        alt="logo"
        width={140}
        height={48}
      />
      <ul className="flex gap-4 text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <li className="cursor-pointer" onClick={handleSignOut}>Sign Out</li>
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
