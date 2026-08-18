"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  onAdded: () => void;
};

export default function SliderForm({ onAdded }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    if (!selectedFile) {
      alert("يرجى اختيار صورة");
      return null;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل رفع الصورة");
      }

      return {
        url: data.url,
        publicId: data.publicId,
      };
    } catch (error) {
      console.error(error);
      alert("فشل رفع الصورة");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addSlide = async () => {
    if (!selectedFile) {
      alert("اختر صورة أولاً");
      return;
    }

    try {
      setLoading(true);

      const uploaded = await uploadImage();

      if (!uploaded) return;

      await addDoc(collection(db, "slider"), {
        image: uploaded.url,
        publicId: uploaded.publicId,
        createdAt: new Date().toISOString(),
      });

      alert("تمت إضافة صورة السلايدر بنجاح");

      setSelectedFile(null);

      onAdded();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة صورة السلايدر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8"
    >
      {/* العنوان */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-8">
        إضافة صورة جديدة للسلايدر
      </h2>

      {/* اختيار الصورة */}
      <div className="mb-6">
        <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
          اختر صورة السلايدر
        </label>

        <input
          type="file"
          accept="image/*"
          className="w-full border-2 border-slate-300 bg-white text-slate-950 text-lg md:text-xl font-bold rounded-xl p-4 cursor-pointer file:ml-4 file:bg-blue-600 file:hover:bg-blue-700 file:text-white file:font-extrabold file:border-0 file:rounded-lg file:px-5 file:py-3"
          onChange={(e) => {
            if (e.target.files?.length) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* الصورة المختارة */}
      {selectedFile && (
        <div className="mb-6">
          <p className="text-lg md:text-xl font-extrabold text-slate-950 mb-3">
            الصورة المختارة:
          </p>

          <p className="text-base md:text-lg font-bold text-slate-700 mb-4 break-all">
            {selectedFile.name}
          </p>

          <img
            src={URL.createObjectURL(selectedFile)}
            alt="معاينة صورة السلايدر"
            className="w-full max-w-2xl h-72 object-cover rounded-xl border-2 border-slate-300 mb-5"
          />
        </div>
      )}

      {/* زر الرفع */}
      <button
        type="button"
        onClick={addSlide}
        disabled={loading || uploading}
        className="w-full md:w-auto min-h-[64px] bg-blue-700 hover:bg-blue-800 text-white text-xl md:text-2xl px-8 py-4 rounded-xl font-extrabold shadow-md transition disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {loading || uploading
          ? "جاري رفع صورة السلايدر..."
          : "🖼️ إضافة صورة للسلايدر"}
      </button>
    </div>
  );
}