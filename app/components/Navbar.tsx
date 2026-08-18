"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isEnglish = pathname.startsWith("/en");

  const closeMenu = () => {
    setIsOpen(false);
  };

  const languagePath = isEnglish ? "/" : "/en";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-900/90 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">

        {/* Logo */}
        <Link
          href={isEnglish ? "/en" : "/"}
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="Roya School"
            width={70}
            height={70}
            priority
            className="md:h-[90px] md:w-[90px]"
          />

          <span className="text-lg font-bold leading-tight text-white md:text-2xl">
            {isEnglish
              ? "Roya Model School for Outstanding Students"
              : "مدرسة رويا النموذجية للمتفوقين"}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 font-semibold text-white md:flex">

          {isEnglish ? (
            <>
              <Link
                href="/en"
                className="transition hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                href="/en/about"
                className="transition hover:text-blue-400"
              >
                About Us
              </Link>

              <Link
                href="/en/stages"
                className="transition hover:text-blue-400"
              >
                Educational Stages
              </Link>

              <Link
                href="/en/announcements"
                className="transition hover:text-blue-400"
              >
                Announcements
              </Link>

              <Link
                href="/en/jobs"
                className="transition hover:text-blue-400"
              >
                Jobs
              </Link>

              <Link
                href="/en/contact"
                className="transition hover:text-blue-400"
              >
                Contact Us
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="transition hover:text-blue-400"
              >
                الرئيسية
              </Link>

              <Link
                href="/about"
                className="transition hover:text-blue-400"
              >
                من نحن
              </Link>

              <Link
                href="/stages"
                className="transition hover:text-blue-400"
              >
                المراحل الدراسية
              </Link>

              <Link
                href="/announcements"
                className="transition hover:text-blue-400"
              >
                الإعلانات
              </Link>

              <Link
                href="/jobs"
                className="transition hover:text-blue-400"
              >
                الوظائف
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-blue-400"
              >
                تواصل معنا
              </Link>
            </>
          )}

          {/* Language Button */}
          <Link
            href={languagePath}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            {isEnglish ? "🇸🇦 العربية" : "🇬🇧 English"}
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-white md:hidden"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-4 bg-slate-900 px-6 py-5 text-center font-semibold text-white md:hidden">

          {isEnglish ? (
            <>
              <Link href="/en" onClick={closeMenu}>
                Home
              </Link>

              <Link href="/en/about" onClick={closeMenu}>
                About Us
              </Link>

              <Link href="/en/stages" onClick={closeMenu}>
                Educational Stages
              </Link>

              <Link href="/en/announcements" onClick={closeMenu}>
                Announcements
              </Link>

              <Link href="/en/jobs" onClick={closeMenu}>
                Jobs
              </Link>

              <Link href="/en/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </>
          ) : (
            <>
              <Link href="/" onClick={closeMenu}>
                الرئيسية
              </Link>

              <Link href="/about" onClick={closeMenu}>
                من نحن
              </Link>

              <Link href="/stages" onClick={closeMenu}>
                المراحل الدراسية
              </Link>

              <Link href="/announcements" onClick={closeMenu}>
                الإعلانات
              </Link>

              <Link href="/jobs" onClick={closeMenu}>
                الوظائف
              </Link>

              <Link href="/contact" onClick={closeMenu}>
                تواصل معنا
              </Link>
            </>
          )}

          {/* Mobile Language */}
          <Link
            href={languagePath}
            onClick={closeMenu}
            className="mx-auto rounded-lg bg-blue-600 px-5 py-2 transition hover:bg-blue-700"
          >
            {isEnglish ? "🇸🇦 العربية" : "🇬🇧 English"}
          </Link>
        </div>
      )}
    </nav>
  );
}