"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

import AdminNavbar from "../components/AdminNavbar";
import GalleryForm from "./GalleryForm";
import GalleryList from "./GalleryList";

export default function GalleryAdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

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

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-slate-100"
      >
        <h1 className="text-2xl font-bold text-slate-900">
          جاري التحقق من تسجيل الدخول...
        </h1>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 pt-28 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <AdminNavbar />

        <GalleryForm onAdded={handleRefresh} />

        <GalleryList refresh={refresh} />
      </div>
    </main>
  );
}