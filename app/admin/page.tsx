"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

import AnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminPage() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  if (checkingAuth) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100 flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            جاري التحقق من تسجيل الدخول...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 pt-24 sm:pt-28 pb-10 px-3 sm:px-6"
    >
      <div className="w-full max-w-5xl mx-auto">

        {/* شريط الإدارة */}
        <div className="mb-5">
          <AdminNavbar />
        </div>

        {/* عنوان الصفحة */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-8 mb-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 mb-3">
            لوحة إدارة الإعلانات
          </h1>

          <p className="text-base sm:text-xl font-bold text-slate-700">
            يمكنك إدارة الإعلانات من الهاتف أو الكمبيوتر بسهولة.
          </p>

        </div>

        {/* إضافة إعلان */}
        <div className="w-full">
          <AnnouncementForm onAdded={handleRefresh} />
        </div>

        {/* قائمة الإعلانات */}
        <div className="mt-6 sm:mt-10 w-full">
          <AnnouncementList refresh={refresh} />
        </div>

      </div>
    </main>
  );
}