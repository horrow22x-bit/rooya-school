"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ROYA School"
            width={70}
            height={70}
            className="md:w-[90px] md:h-[90px]"
          />

          <span className="text-white font-bold text-lg md:text-2xl leading-tight">
            مدرسة رويا النموذجية للمتفوقين
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white font-semibold">
          <Link href="/">الرئيسية</Link>
          <Link href="/about">من نحن</Link>
          <Link href="/stages">المراحل الدراسية</Link>
          <Link href="/announcements">الإعلانات</Link>
          <Link href="/jobs">الوظائف</Link>
          <Link href="/contact">تواصل معنا</Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 text-white flex flex-col text-center py-4 space-y-4 font-semibold">
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
        </div>
      )}
    </nav>
  );
}