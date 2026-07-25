"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

import AnnouncementForm from "./AnnouncementForm";
import AnnouncementList from "./AnnouncementList";

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

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          جاري التحقق من تسجيل الدخول...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-28 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            لوحة إدارة الإعلانات
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold"
          >
            تسجيل الخروج
          </button>
        </div>

        <AnnouncementForm onAdded={handleRefresh} />

        <AnnouncementList refresh={refresh} />

      </div>
    </main>
  );
}