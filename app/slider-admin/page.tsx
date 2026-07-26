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
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          جاري التحقق من تسجيل الدخول...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AdminNavbar />

        <SliderForm onAdded={reload} />

        <SliderList refresh={refresh} />
      </div>
    </main>
  );
}