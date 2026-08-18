"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  onAdded: () => void;
};

export default function AnnouncementForm({ onAdded }: Props) {
  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [loading, setLoading] = useState(false);

  const addAnnouncement = async () => {
    if (!titleAr || !descriptionAr || !titleEn || !descriptionEn) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "announcements"), {
        titleAr,
        descriptionAr,
        titleEn,
        descriptionEn,
        createdAt: serverTimestamp(),
      });

      alert("تمت إضافة الإعلان بنجاح");

      setTitleAr("");
      setDescriptionAr("");
      setTitleEn("");
      setDescriptionEn("");

      onAdded();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة الإعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-10">

      {/* العنوان */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-10">
        إضافة إعلان جديد
      </h2>

      {/* ================= العربية ================= */}
      <div
        dir="rtl"
        className="border-b-2 border-slate-200 pb-10 mb-10"
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-8">
          🇸🇦 الإعلان بالعربية
        </h3>

        {/* عنوان الإعلان */}
        <div className="mb-7">
          <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
            عنوان الإعلان
            <span className="text-red-600 mr-1">*</span>
          </label>

          <input
            type="text"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            className="w-full min-h-[64px] border-2 border-slate-300 bg-white text-slate-950 text-xl md:text-2xl font-semibold rounded-xl px-5 py-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-500 placeholder:font-medium"
            placeholder="اكتب عنوان الإعلان بالعربية"
          />
        </div>

        {/* وصف الإعلان */}
        <div>
          <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
            وصف الإعلان
            <span className="text-red-600 mr-1">*</span>
          </label>

          <textarea
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            rows={7}
            className="w-full border-2 border-slate-300 bg-white text-slate-950 text-xl md:text-2xl font-semibold rounded-xl px-5 py-4 outline-none resize-y focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-500 placeholder:font-medium"
            placeholder="اكتب وصف الإعلان بالعربية"
          />
        </div>
      </div>

      {/* ================= English ================= */}
      <div dir="ltr">
        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-8">
          🇬🇧 English Announcement
        </h3>

        {/* Announcement Title */}
        <div className="mb-7">
          <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
            Announcement Title
            <span className="text-red-600 ml-1">*</span>
          </label>

          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            className="w-full min-h-[64px] border-2 border-slate-300 bg-white text-slate-950 text-xl md:text-2xl font-semibold rounded-xl px-5 py-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-500 placeholder:font-medium"
            placeholder="Write the announcement title in English"
          />
        </div>

        {/* Announcement Description */}
        <div>
          <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
            Announcement Description
            <span className="text-red-600 ml-1">*</span>
          </label>

          <textarea
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            rows={7}
            className="w-full border-2 border-slate-300 bg-white text-slate-950 text-xl md:text-2xl font-semibold rounded-xl px-5 py-4 outline-none resize-y focus:border-blue-600 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-500 placeholder:font-medium"
            placeholder="Write the announcement description in English"
          />
        </div>
      </div>

      {/* ================= زر الحفظ ================= */}
      <button
        type="button"
        onClick={addAnnouncement}
        disabled={loading}
        className="w-full mt-10 min-h-[68px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xl md:text-2xl font-extrabold rounded-xl shadow-lg transition disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {loading ? "جاري حفظ الإعلان..." : "💾 حفظ الإعلان"}
      </button>

    </div>
  );
}