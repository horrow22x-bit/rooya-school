"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

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

  const addImage = async () => {
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

      alert("تمت إضافة صورة السلايدر");

      setSelectedFile(null);

      onAdded();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        إضافة صورة للسلايدر
      </h2>

      <input
        type="file"
        accept="image/*"
        className="w-full border rounded-lg p-3 mb-5"
        onChange={(e) => {
          if (e.target.files?.length) {
            setSelectedFile(e.target.files[0]);
          }
        }}
      />

      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="w-60 rounded-lg border mb-5"
        />
      )}

      <button
        onClick={addImage}
        disabled={loading || uploading}
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold disabled:bg-gray-400"
      >
        {loading ? "جاري الرفع..." : "رفع صورة السلايدر"}
      </button>
    </div>
  );
}