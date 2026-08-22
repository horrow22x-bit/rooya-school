"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

type Announcement = {
  id: string;
  titleAr: string;
  descriptionAr: string;
  image: string;
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

        const data = snapshot.docs.map((item) => {
          const announcement = item.data();

          let date = "";

          if (announcement.createdAt instanceof Timestamp) {
            date = announcement.createdAt
              .toDate()
              .toLocaleDateString("ar-SA");
          } else if (typeof announcement.date === "string") {
            date = announcement.date;
          }

          return {
            id: item.id,

            titleAr:
              announcement.titleAr ||
              announcement.title ||
              "",

            descriptionAr:
              announcement.descriptionAr ||
              announcement.description ||
              "",

            image:
              announcement.image ||
              announcement.imageUrl ||
              "",

            date,
          };
        });

        setAnnouncements(data);
      } catch (error) {
        console.error(
          "Failed to load Arabic announcements:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950"
    >
      {/* ================= HEADER ================= */}

      <section className="bg-slate-900 pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            آخر الأخبار والإعلانات
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            تابع آخر أخبار وفعاليات وإعلانات مدرسة رويا النموذجية.
          </p>

        </div>
      </section>

      {/* ================= ANNOUNCEMENTS ================= */}

      <section className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          {loading ? (
            <div className="text-center text-slate-700 text-xl">
              جاري تحميل الإعلانات...
            </div>
          ) : announcements.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <div className="text-5xl mb-5">
                📢
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                لا توجد إعلانات حاليًا
              </h2>

              <p className="text-gray-600">
                ستظهر الإعلانات الجديدة هنا قريبًا.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {announcements.map((announcement) => (

                <article
                  key={announcement.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >

                  {/* ================= IMAGE ================= */}

                  {announcement.image ? (
                    <div className="w-full bg-gray-100">

                      <img
                        src={announcement.image}
                        alt={
                          announcement.titleAr ||
                          "إعلان"
                        }
                        className="w-full h-64 object-cover"
                      />

                    </div>
                  ) : (

                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">

                      <div className="text-center text-gray-400">

                        <div className="text-5xl mb-3">
                          📢
                        </div>

                        <p>
                          لا توجد صورة
                        </p>

                      </div>

                    </div>
                  )}

                  {/* ================= CONTENT ================= */}

                  <div className="p-6">

                    {/* التاريخ */}

                    {announcement.date && (
                      <div className="text-blue-600 font-semibold mb-3">
                        {announcement.date}
                      </div>
                    )}

                    {/* العنوان */}

                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      {announcement.titleAr}
                    </h2>

                    {/* الوصف */}

                    <p className="text-gray-600 leading-8">
                      {announcement.descriptionAr}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>

      {/* ================= BACK HOME ================= */}

      <section className="bg-slate-950 py-12 text-center">

        <Link
          href="/ar"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
        >
          العودة إلى الصفحة الرئيسية
        </Link>

      </section>

    </main>
  );
}