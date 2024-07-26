import type { Metadata } from "next";
import "./globals.css";
import { dm_sans } from "./fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import { Database } from "./types/supabase";

export const metadata: Metadata = {
  title: "Blog Test",
  description: "A blog where you can post and comment.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased w-full max-w-[1289px] mx-auto px-8 relative h-[3000px]`}
      >
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
