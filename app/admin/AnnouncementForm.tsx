"use client";

import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  onAdded: () => void;
};

export default function AnnouncementForm({ onAdded }: Props) {
  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // اختيار الصورة
  // =========================
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage(null);
      setImagePreview("");
      return;
    }

    // التأكد أن الملف صورة
    if (!file.type.startsWith("image/")) {
      setError("يرجى اختيار صورة فقط");
      setImage(null);
      setImagePreview("");
      return;
    }

    // الحد الأقصى 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("حجم الصورة يجب ألا يتجاوز 10 ميجابايت");
      setImage(null);
      setImagePreview("");
      return;
    }

    setError("");
    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =========================
  // رفع الصورة
  // =========================
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error || "فشل رفع الصورة"
      );
    }

    return {
      url: result.url || result.secure_url || "",
      publicId:
        result.publicId ||
        result.public_id ||
        "",
    };
  };

  // =========================
  // إضافة الإعلان
  // =========================
  const addAnnouncement = async () => {
    setError("");

    // التحقق من الحقول
    if (
      !titleAr.trim() ||
      !descriptionAr.trim() ||
      !titleEn.trim() ||
      !descriptionEn.trim()
    ) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    if (!image) {
      setError("يرجى اختيار صورة للإعلان");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ رفع الصورة
      const uploadedImage = await uploadImage(image);

      if (!uploadedImage.url) {
        throw new Error("لم يتم الحصول على رابط الصورة");
      }

      // 2️⃣ حفظ الإعلان في Firebase
      await addDoc(
        collection(db, "announcements"),
        {
          titleAr: titleAr.trim(),
          descriptionAr: descriptionAr.trim(),

          titleEn: titleEn.trim(),
          descriptionEn: descriptionEn.trim(),

          image: uploadedImage.url,
          publicId: uploadedImage.publicId,

          createdAt: serverTimestamp(),

          date: new Date().toLocaleDateString(
            "ar-SA"
          ),
        }
      );

      // 3️⃣ رسالة نجاح
      alert("✅ تم إضافة الإعلان بنجاح");

      // 4️⃣ تنظيف الحقول
      setTitleAr("");
      setDescriptionAr("");

      setTitleEn("");
      setDescriptionEn("");

      setImage(null);
      setImagePreview("");

      setError("");

      // 5️⃣ تحديث قائمة الإعلانات
      onAdded();
    } catch (error) {
      console.error(
        "Announcement error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء إضافة الإعلان"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

      {/* العنوان */}
      <h2 className="text-3xl font-bold text-blue-700 mb-8">
        إضافة إعلان جديد
      </h2>

      {/* ========================= */}
      {/* العربية */}
      {/* ========================= */}

      <div
        className="border rounded-2xl p-6 mb-8"
        dir="rtl"
      >
        <h3 className="text-2xl font-bold text-blue-700 mb-6">
          🇸🇦 الإعلان بالعربية
        </h3>

        {/* العنوان العربي */}
        <div className="mb-5">
          <label className="block font-bold text-gray-700 mb-2">
            عنوان الإعلان
          </label>

          <input
            type="text"
            value={titleAr}
            onChange={(e) =>
              setTitleAr(e.target.value)
            }
            placeholder="اكتب عنوان الإعلان بالعربية"
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* الوصف العربي */}
        <div>
          <label className="block font-bold text-gray-700 mb-2">
            وصف الإعلان
          </label>

          <textarea
            value={descriptionAr}
            onChange={(e) =>
              setDescriptionAr(e.target.value)
            }
            placeholder="اكتب وصف الإعلان بالعربية"
            rows={6}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* English */}
      {/* ========================= */}

      <div
        className="border rounded-2xl p-6 mb-8"
        dir="ltr"
      >
        <h3 className="text-2xl font-bold text-blue-700 mb-6">
          🇬🇧 English Announcement
        </h3>

        {/* English title */}
        <div className="mb-5">
          <label className="block font-bold text-gray-700 mb-2">
            Announcement Title
          </label>

          <input
            type="text"
            value={titleEn}
            onChange={(e) =>
              setTitleEn(e.target.value)
            }
            placeholder="Write the announcement title in English"
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* English description */}
        <div>
          <label className="block font-bold text-gray-700 mb-2">
            Announcement Description
          </label>

          <textarea
            value={descriptionEn}
            onChange={(e) =>
              setDescriptionEn(e.target.value)
            }
            placeholder="Write the announcement description in English"
            rows={6}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* الصورة */}
      {/* ========================= */}

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-8"
        dir="rtl"
      >
        <h3 className="text-2xl font-bold text-blue-700 mb-5">
          🖼️ صورة الإعلان
        </h3>

        <label className="block">

          <span className="block font-bold text-gray-700 mb-3">
            اختيار صورة
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-xl p-3 cursor-pointer"
          />
        </label>

        {/* اسم الصورة */}
        {image && (
          <p className="mt-4 text-gray-600">
            الصورة المختارة:{" "}
            <span className="font-bold">
              {image.name}
            </span>
          </p>
        )}

        {/* معاينة الصورة */}
        {imagePreview && (
          <div className="mt-6">

            <p className="font-bold text-gray-700 mb-3">
              معاينة الصورة
            </p>

            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-96 object-contain rounded-xl border"
            />

          </div>
        )}
      </div>

      {/* ========================= */}
      {/* الخطأ */}
      {/* ========================= */}

      {error && (
        <div
          className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 mb-6"
          dir="rtl"
        >
          ❌ {error}
        </div>
      )}

      {/* ========================= */}
      {/* زر الإضافة */}
      {/* ========================= */}

      <button
        type="button"
        onClick={addAnnouncement}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-xl transition"
      >
        {loading
          ? image
            ? "⏳ جاري رفع الصورة وإضافة الإعلان..."
            : "⏳ جاري إضافة الإعلان..."
          : "إضافة الإعلان"}
      </button>

    </div>
  );
}