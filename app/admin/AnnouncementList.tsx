"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import AnnouncementCard from "./AnnouncementCard";

type Announcement = {
  id: string;
  title: string;
  description: string;
  image: string;
  publicId: string;
  date: string;
};

type Props = {
  refresh: number;
};

export default function AnnouncementList({ refresh }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "announcements"));

      const data: Announcement[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...(doc.data() as Omit<Announcement, "id">),
        })
      );

      setAnnouncements(data);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحميل الإعلانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [refresh]);

  if (loading) {
    return (
      <div className="text-center text-lg font-bold py-8">
        جاري تحميل الإعلانات...
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        لا توجد إعلانات حالياً.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onDeleted={fetchAnnouncements}
        />
      ))}
    </div>
  );
}