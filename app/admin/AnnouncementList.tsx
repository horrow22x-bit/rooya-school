"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  refresh: number;
};

type Announcement = {
  id: string;
  titleAr: string;
  descriptionAr: string;
  titleEn: string;
  descriptionEn: string;
};

export default function AnnouncementList({ refresh }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const loadAnnouncements = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "announcements")
      );

      const data = snapshot.docs.map((item) => {
        const data = item.data();

        return {
          id: item.id,
          titleAr: data.titleAr || data.title || "",
          descriptionAr: data.descriptionAr || data.description || "",
          titleEn: data.titleEn || "",
          descriptionEn: data.descriptionEn || "",
        };
      });

      setAnnouncements(data);
    } catch (error) {
      console.error(error);
      alert("فشل تحميل الإعلانات");
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, [refresh]);

  const startEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);

    setTitleAr(announcement.titleAr);
    setDescriptionAr(announcement.descriptionAr);

    setTitleEn(announcement.titleEn);
    setDescriptionEn(announcement.descriptionEn);
  };

  const cancelEdit = () => {
    setEditingId(null);

    setTitleAr("");
    setDescriptionAr("");

    setTitleEn("");
    setDescriptionEn("");
  };

  const saveEdit = async () => {
    if (
      !titleAr ||
      !descriptionAr ||
      !titleEn ||
      !descriptionEn
    ) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (!editingId) return;

    try {
      await updateDoc(doc(db, "announcements", editingId), {
        titleAr,
        descriptionAr,
        titleEn,
        descriptionEn,
      });

      alert("تم تعديل الإعلان بنجاح");

      cancelEdit();
      loadAnnouncements();
    } catch (error) {
      console.error(error);
      alert("فشل تعديل الإعلان");
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm("هل تريد حذف هذا الإعلان؟")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "announcements", id));

      alert("تم حذف الإعلان");

      loadAnnouncements();
    } catch (error) {
      console.error(error);
      alert("فشل حذف الإعلان");
    }
  };

  return (
    <div className="space-y-6">

      {announcements.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500 text-lg">
            لا توجد إعلانات حاليًا
          </p>
        </div>
      ) : (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            {editingId === announcement.id ? (
              /* ================= EDIT ================= */
              <div>

                <h2 className="text-2xl font-bold mb-6">
                  تعديل الإعلان
                </h2>

                {/* Arabic */}
                <div className="border-b pb-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    🇸🇦 العربية
                  </h3>

                  <input
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                    placeholder="عنوان الإعلان بالعربية"
                    dir="rtl"
                  />

                  <textarea
                    value={descriptionAr}
                    onChange={(e) =>
                      setDescriptionAr(e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                    rows={5}
                    placeholder="وصف الإعلان بالعربية"
                    dir="rtl"
                  />
                </div>

                {/* English */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    🇬🇧 English
                  </h3>

                  <input
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                    placeholder="Announcement title in English"
                    dir="ltr"
                  />

                  <textarea
                    value={descriptionEn}
                    onChange={(e) =>
                      setDescriptionEn(e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                    rows={5}
                    placeholder="Announcement description in English"
                    dir="ltr"
                  />
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={saveEdit}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    حفظ التعديل
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    إلغاء
                  </button>

                </div>

              </div>
            ) : (
              /* ================= VIEW ================= */
              <div>

                {/* Arabic */}
                <div
                  className="border-b pb-5 mb-5"
                  dir="rtl"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    🇸🇦 {announcement.titleAr}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {announcement.descriptionAr}
                  </p>
                </div>

                {/* English */}
                <div
                  className="border-b pb-5 mb-5"
                  dir="ltr"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    🇬🇧 {announcement.titleEn}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {announcement.descriptionEn}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  <button
                    onClick={() => startEdit(announcement)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() =>
                      deleteAnnouncement(announcement.id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    حذف
                  </button>

                </div>

              </div>
            )}

          </div>
        ))
      )}

    </div>
  );
}