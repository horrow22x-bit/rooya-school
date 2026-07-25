"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type Props = {
  onAdded: () => void;
};

export default function AnnouncementForm({ onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [date, setDate] = useState("");

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

      setImage(data.url);
      setPublicId(data.publicId);

      return {
        url: data.url,
        publicId: data.publicId,
      };
    } catch (error) {
      console.error(error);
      alert("❌ فشل رفع الصورة");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const publishAnnouncement = async () => {
    if (!title || !description || !date) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = image;
      let imagePublicId = publicId;

      if (!imageUrl) {
        const uploaded = await uploadImage();

        if (!uploaded) {
          setLoading(false);
          return;
        }

        imageUrl = uploaded.url;
        imagePublicId = uploaded.publicId;
      }await addDoc(collection(db, "announcements"), {
        title,
        description,
        image: imageUrl,
        publicId: imagePublicId,
        date,
      });

      alert("✅ تم نشر الإعلان بنجاح");

      setTitle("");
      setDescription("");
      setImage("");
      setPublicId("");
      setDate("");
      setSelectedFile(null);

      onAdded();
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ أثناء حفظ الإعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        إضافة إعلان جديد
      </h2>

      <label className="block mb-2 font-semibold text-gray-800">
        عنوان الإعلان
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
       className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-gray-900 placeholder:text-gray-500"
        placeholder="عنوان الإعلان"
      />

      <label className="block mb-2 font-semibold">
        وصف الإعلان
      </label>

      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
        placeholder="وصف الإعلان"
      />

      <label className="block mb-2 font-semibold">
        صورة الإعلان
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
          }
        }}
       className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-gray-900 placeholder:text-gray-500"
      />

      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="w-48 rounded-lg mb-6 border"
        />
      )}

      {uploading && (
        <p className="text-blue-600 mb-6">
          جاري رفع الصورة...
        </p>
      )}

      <label className="block mb-2 font-semibold">
        تاريخ الإعلان
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-8 text-gray-900"
      />

      <button
        onClick={publishAnnouncement}
        disabled={loading || uploading}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-3 rounded-lg text-lg font-bold transition"
      >
        {loading ? "جاري النشر..." : "نشر الإعلان"}
      </button>
    </div>
  );
}