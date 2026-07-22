import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "مدرسة رويا النموذجية للمتفوقين",
  description: "الموقع الرسمي لمدرسة رويا النموذجية للمتفوقين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <body className="min-h-screen flex flex-col bg-slate-950">

        <Navbar />

        <main className="flex-1 pt-24">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}