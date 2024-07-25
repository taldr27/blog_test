import type { Metadata } from "next";
import "./globals.css";
import { dm_sans } from "./fonts";

export const metadata: Metadata = {
  title: "Blog Test",
  description: "A blog where you can post and comment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} antialiased`}>{children}</body>
    </html>
  );
}
