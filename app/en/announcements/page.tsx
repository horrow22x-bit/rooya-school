"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Announcement = {
  id: string;
  titleEn: string;
  descriptionEn: string;
  date: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "announcements")
        );

        const data = snapshot.docs.map((doc) => {
          const item = doc.data();

          let date = "";

          if (item.createdAt instanceof Timestamp) {
            date = item.createdAt
              .toDate()
              .toLocaleDateString("en-US");
          } else if (typeof item.date === "string") {
            date = item.date;
          }

          return {
            id: doc.id,
            titleEn: item.titleEn || "",
            descriptionEn: item.descriptionEn || "",
            date,
          };
        });

        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to load announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <main
      dir="ltr"
      className="min-h-screen bg-slate-950"
    >
      {/* Header */}
      <section className="bg-slate-900 pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            News & Announcements
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow the latest news, activities and
            announcements from Roya Model School.
          </p>

        </div>
      </section>

      {/* Announcements */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          {loading ? (
            <div className="text-center text-slate-700 text-xl">
              Loading announcements...
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <div className="text-5xl mb-5">
                📢
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                No announcements available
              </h2>

              <p className="text-gray-600">
                New announcements will appear here soon.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >

                  {announcement.date && (
                    <div className="text-blue-600 font-semibold mb-3">
                      {announcement.date}
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {announcement.titleEn}
                  </h2>

                  <p className="text-gray-600 leading-7">
                    {announcement.descriptionEn}
                  </p>

                </article>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* Back Home */}
      <section className="bg-slate-950 py-12 text-center">

        <Link
          href="/en"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
        >
          Back to Home
        </Link>

      </section>
    </main>
  );
}