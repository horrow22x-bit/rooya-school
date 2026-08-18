"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

import AdminNavbar from "../components/AdminNavbar";
import SliderForm from "./SliderForm";
import SliderList from "./SliderList";

export default function SliderAdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const reload = () => {
    setRefresh((prev) => !prev);
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100 flex items-center justify-center px-6"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950">
            جاري التحقق من تسجيل الدخول...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 pt-28 pb-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* شريط الإدارة */}
        <AdminNavbar />

        {/* عنوان الصفحة */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-4">
            إدارة السلايدر
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-800">
            إضافة وإدارة صور السلايدر في الصفحة الرئيسية
          </p>

        </div>

        {/* إضافة صورة للسلايدر */}
        <SliderForm onAdded={reload} />

        {/* الصور الموجودة */}
        <div className="mt-10">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8 mb-6">

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950">
              صور السلايدر الحالية
            </h2>

          </div>

          <SliderList refresh={refresh} />

        </div>

      </div>
    </main>
  );
}