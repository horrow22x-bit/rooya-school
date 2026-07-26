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
        <AdminNavbar />

        <AnnouncementForm onAdded={handleRefresh} />

        <AnnouncementList refresh={refresh} />
      </div>
    </main>
  );
}