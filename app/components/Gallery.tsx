"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryImage = {
  id: string;
  image: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [index, setIndex] = useState(-1);

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
          {images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setIndex(i)}
              className="group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            >
              <Image
                src={img.image}
                alt="صورة"
                width={800}
                height={600}
                unoptimized
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={images.map((img) => ({
            src: img.image,
          }))}
        />
      </div>
    </section>
  );
}