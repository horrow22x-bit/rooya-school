"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

import GalleryForm from "./GalleryForm";
import GalleryList from "./GalleryList";

export default function GalleryAdminPage() {
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

  const logout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">جاري التحقق...</h1>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          إدارة معرض الصور
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          تسجيل الخروج
        </button>
      </div>

      <GalleryForm onAdded={reload} />

      <GalleryList refresh={refresh} />
    </main>
  );
}