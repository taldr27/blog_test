"use client";

import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="flex justify-between h-20 items-center mb-[72px] bg-[#222222] rounded-2xl px-12 mt-8">
      <Image src="/static/images/logo.png" alt="logo" width={140} height={48} />
      <ul className="flex gap-4 text-lg items-center">
        <li className="hover:text-gray-300">
          <Link className={`${pathname === "/" ? "underline" : ""}`} href="/">
            Home
          </Link>
        </li>
        {user ? (
          <>
            {/* <li className="hover:text-gray-300">
              <Link
                className={`${pathname === "/#your-posts" ? "underline" : ""}`}
                href="#your-posts"
              >
                Your Posts
              </Link>
            </li> */}
            <li>
              <button
                className="cursor-pointer bg-red-500 rounded-3xl py-2 px-4 hover:bg-red-600"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li
            className={`hover:text-gray-300 ${
              pathname === "/login" ? "underline" : ""
            }`}
          >
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
