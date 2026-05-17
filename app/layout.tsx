import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Developer | Portfolio",
  description: "Personal portfolio showcasing full-stack web development, database management, and software engineering projects.",
  metadataBase: new URL('https://swayamvasavada.com'),
  openGraph: {
    title: "Software Developer Portfolio",
    description: "Explore my latest technical projects and software builds.",
    url: 'https://swayamvasavada.com',
    siteName: 'Developer Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen antialiased`}>
        <Navbar />
        {/* We will add the <Navbar /> here later */}
        {children}
      </body>
    </html>
  );
}