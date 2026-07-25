"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const querySnapshot = await getDocs(collection(db, "announcements"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Announcement, "id">),
      }));

      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);

  return (
    <main className="pt-28 pb-16 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-10">
          الإعلانات
        </h1>

        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl shadow-lg p-6 mb-10"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {announcement.title}
            </h2>

            <Image
              src={announcement.image}
              alt={announcement.title}
              width={1000}
              height={600}
              className="w-full rounded-xl mb-4"
            />

            <p className="text-gray-700 text-lg leading-8 mb-4">
              {announcement.description}
            </p>

            <p className="text-gray-500 text-sm">
              {announcement.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}