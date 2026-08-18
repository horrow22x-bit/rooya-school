"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type Props = {
  onAdded: () => void;
};

export default function GalleryForm({ onAdded }: Props) {
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
      console.error("Upload error:", error);

      alert(
        `فشل رفع الصورة:\n${
          error instanceof Error ? error.message : "خطأ غير معروف"
        }`
      );

      return null;
    } finally {
      setUploading(false);
    }
  };

  const addImage = async () => {
    if (!selectedFile) {
      alert("اختر صورة أولاً");
      return;
    }

    try {
      setLoading(true);

      const uploaded = await uploadImage();

      if (!uploaded) {
        return;
      }

      await addDoc(collection(db, "gallery"), {
        image: uploaded.url,
        publicId: uploaded.publicId,
        createdAt: new Date().toISOString(),
      });

      alert("تمت إضافة الصورة بنجاح");

      setSelectedFile(null);

      onAdded();
    } catch (error) {
      console.error("Gallery error:", error);

      alert(
        `حدث خطأ:\n${
          error instanceof Error ? error.message : "خطأ غير معروف"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-8">
        إضافة صورة جديدة
      </h2>

      <div className="mb-6">
        <label className="block text-xl md:text-2xl font-extrabold text-slate-950 mb-3">
          اختر صورة
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

      {selectedFile && (
        <div className="mb-6">
          <p className="text-lg md:text-xl font-extrabold text-slate-900 mb-3">
            الصورة المختارة:
          </p>

          <p className="text-base md:text-lg font-bold text-slate-700 mb-4 break-all">
            {selectedFile.name}
          </p>

          <img
            src={URL.createObjectURL(selectedFile)}
            alt="معاينة الصورة"
            className="w-full max-w-xl rounded-xl border-2 border-slate-300 mb-5"
          />
        </div>
      )}

      <button
        type="button"
        onClick={addImage}
        disabled={loading || uploading}
        className="w-full md:w-auto min-h-[64px] bg-blue-700 hover:bg-blue-800 text-white text-xl md:text-2xl px-8 py-4 rounded-xl font-extrabold shadow-md transition disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {loading || uploading ? "جاري رفع الصورة..." : "🖼️ رفع الصورة"}
      </button>
    </div>
  );
}