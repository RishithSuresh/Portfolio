import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishith Suresh — Luxury Portfolio",
  description:
    "An Apple-inspired cinematic portfolio blending luxury visual design, smooth motion, and premium interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
