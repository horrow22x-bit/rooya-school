"use client";

import GalleryForm from "./GalleryForm";
import GalleryList from "./GalleryList";
import AdminNavbar from "../components/AdminNavbar";

export default function GalleryAdminPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 pt-28 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <AdminNavbar />

        {/* عنوان الصفحة */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-4">
            إدارة معرض الصور
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-800">
            إضافة الصور وإدارة معرض المدرسة
          </p>

        </div>

        {/* إضافة الصور */}
        <div className="mb-10">
          <GalleryForm />
        </div>

        {/* الصور الموجودة */}
        <div>
          <GalleryList />
        </div>

      </div>
    </main>
  );
}