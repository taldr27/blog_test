"use client";

import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between h-20 items-center mb-[72px] bg-[#222222] rounded-2xl px-4 md:px-12 mt-8 relative">
      <Image src="/static/images/logo.png" alt="logo" width={140} height={48} />
      <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
        {isOpen ? (
          <Image
            src="/close_menu.svg"
            width={30}
            height={30}
            alt="burger-menu"
          />
        ) : (
          <Image
            src="/burger_menu.svg"
            width={30}
            height={30}
            alt="burger-menu"
          />
        )}
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row pb-3 md:pb-0 gap-3 text-lg items-center absolute md:relative top-16 rounded-b-2xl md:top-0 left-0 w-full md:w-auto bg-[#222222] md:bg-transparent px-12 md:px-0`}
      >
        <li className="hover:text-gray-300">
          <Link className={`${pathname === "/" ? "underline" : ""}`} href="/">
            Home
          </Link>
        </li>
        {user ? (
          <li>
            <button
              className="cursor-pointer bg-red-500 rounded-3xl py-2 px-4 hover:bg-red-600"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
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
