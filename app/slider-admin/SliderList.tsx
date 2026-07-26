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

type SliderImage = {
  id: string;
  image: string;
  publicId: string;
};

export default function SliderList({ refresh }: Props) {
  const [images, setImages] = useState<SliderImage[]>([]);

  const loadImages = async () => {
    const snapshot = await getDocs(collection(db, "slider"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SliderImage, "id">),
    }));

    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, [refresh]);

  const deleteImage = async (id: string, publicId: string) => {
    if (!confirm("هل تريد حذف صورة السلايدر؟")) return;

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      await deleteDoc(doc(db, "slider", id));

      loadImages();

      alert("تم حذف صورة السلايدر");
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
            alt="Slider"
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