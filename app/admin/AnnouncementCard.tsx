"use client";

import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import EditAnnouncementModal from "./EditAnnouncementModal";

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
  onDeleted: () => void;
};

export default function AnnouncementCard({
  announcement,
  onDeleted,
}: Props) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "هل أنت متأكد من حذف هذا الإعلان؟"
    );

    if (!confirmDelete) return;

    try {
      // حذف الصورة من Cloudinary
      if (announcement.publicId) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId: announcement.publicId,
          }),
        });
      }

      // حذف الإعلان من Firestore
      await deleteDoc(
        doc(db, "announcements", announcement.id)
      );

      alert("✅ تم حذف الإعلان");

      onDeleted();
    } catch (error) {
      console.error("Delete error:", error);

      alert("❌ حدث خطأ أثناء حذف الإعلان");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        {/* صورة الإعلان */}
        <img
          src={announcement.image}
          alt={announcement.title}
          className="w-full h-56 object-cover rounded-xl mb-4"
        />

        {/* عنوان الإعلان */}
        <h2 className="text-2xl font-bold text-blue-700 mb-3">
          {announcement.title}
        </h2>

        {/* وصف الإعلان */}
        <p className="text-gray-700 mb-4">
          {announcement.description}
        </p>

        {/* التاريخ */}
        <p className="text-gray-500 mb-6">
          {announcement.date}
        </p>

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-bold"
          >
            ✏️ تعديل
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold"
          >
            🗑️ حذف
          </button>
        </div>
      </div>

      {/* نافذة التعديل */}
      {editing && (
        <EditAnnouncementModal
          announcement={announcement}
          onClose={() => setEditing(false)}
          onUpdated={onDeleted}
        />
      )}
    </>
  );
}