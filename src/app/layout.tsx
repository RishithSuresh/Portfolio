import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishith Suresh | Portfolio",
  description: "Interactive developer portfolio with animated visuals, projects, skills, and contact details.",
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
