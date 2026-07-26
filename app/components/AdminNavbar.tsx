"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  const linkStyle = (path: string) =>
    `px-4 py-2 rounded-lg font-semibold transition ${
      pathname === path
        ? "bg-blue-700 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
    }`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <h1 className="text-3xl font-bold">
        لوحة إدارة المدرسة
      </h1>

      <div className="flex flex-wrap gap-2 justify-center">
        <Link href="/admin" className={linkStyle("/admin")}>
          📰 الإعلانات
        </Link>

        <Link href="/gallery-admin" className={linkStyle("/gallery-admin")}>
          🖼️ المعرض
        </Link>

        <Link href="/slider-admin" className={linkStyle("/slider-admin")}>
          🎞️ السلايدر
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          🚪 تسجيل الخروج
        </button>
      </div>
    </div>
  );
}