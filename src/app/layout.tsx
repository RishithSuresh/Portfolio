import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Chrono Archive | Rishith Suresh",
  description:
    "An interactive cinematic notebook portfolio exploring projects, inventions, memories, and timelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--charcoal-black)] text-[var(--aged-paper)]">
        {children}
      </body>
    </html>
  );
}
