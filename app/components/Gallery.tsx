"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

type GalleryImage = {
  id: string;
  image: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const snapshot = await getDocs(collection(db, "gallery"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image,
      }));

      setImages(data);
    };

    loadImages();
  }, []);

  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          معرض الصور
        </h2>

        <p className="text-center text-gray-400 mb-12">
          جولة داخل مدرسة رويا النموذجية للمتفوقين
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={img.image}
                alt="صورة"
                width={800}
                height={600}
                className="w-full h-72 object-cover transition-all duration-500 group-hover:scale-110"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}