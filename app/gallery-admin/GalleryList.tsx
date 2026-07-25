"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  refresh: boolean;
};

type GalleryImage = {
  id: string;
  image: string;
  publicId: string;
};

export default function GalleryList({ refresh }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);

  const loadImages = async () => {
    const snapshot = await getDocs(collection(db, "gallery"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<GalleryImage, "id">),
    }));

    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, [refresh]);

  const deleteImage = async (id: string, publicId: string) => {
    if (!confirm("هل تريد حذف الصورة؟")) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      await deleteDoc(doc(db, "gallery", id));

      loadImages();

      alert("تم حذف الصورة");
    } catch (error) {
      console.error(error);
      alert("فشل حذف الصورة");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {images.map((img) => (
        <div
          key={img.id}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <img
            src={img.image}
            alt=""
            className="w-full h-60 object-cover rounded-lg"
          />

          <button
            onClick={() => deleteImage(img.id, img.publicId)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            حذف الصورة
          </button>
        </div>
      ))}
    </div>
  );
}