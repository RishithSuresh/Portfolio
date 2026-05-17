import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishith Suresh // Interactive Universe Portfolio",
  description:
    "A cinematic 3D universe portfolio with immersive planetary navigation across AI, cybersecurity, music technology, and data systems.",
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
