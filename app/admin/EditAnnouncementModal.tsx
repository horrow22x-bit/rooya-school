"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Announcement = {
  id: string;
  title: string;
  description: string;
  image: string;
  publicId: string;
  date: string;
};

type Props = {
  announcement: Announcement;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditAnnouncementModal({
  announcement,
  onClose,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [date, setDate] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(announcement.title);
    setDescription(announcement.description);
    setImage(announcement.image);
    setPublicId(announcement.publicId);
    setDate(announcement.date);
  }, [announcement]);

  const saveChanges = async () => {
    try {
      setLoading(true);

      let imageUrl = image;
      let imagePublicId = publicId;

      if (selectedFile) {
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

        imageUrl = data.url;
        imagePublicId = data.publicId;
      }await updateDoc(doc(db, "announcements", announcement.id), {
        title,
        description,
        image: imageUrl,
        publicId: imagePublicId,
        date,
      });

      alert("✅ تم تحديث الإعلان");

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ أثناء تحديث الإعلان");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          تعديل الإعلان
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="العنوان"
        />

        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="الوصف"
        />

        {image && (
          <img
            src={image}
            alt="الصورة الحالية"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-3 mb-4"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />

        <input
          type="date"
          className="w-full border rounded-lg p-3 mb-6"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={saveChanges}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold"
          >
            {loading ? "جاري الحفظ..." : "حفظ"}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}