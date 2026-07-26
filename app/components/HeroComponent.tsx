"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

type SliderImage = {
  id: string;
  image: string;
};

export default function HeroComponent() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const loadSlider = async () => {
      try {
        const q = query(
          collection(db, "slider"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          const item = doc.data() as SliderImage;
          return item.image;
        });

        setImages(data);
      } catch (error) {
        console.error("خطأ في تحميل السلايدر:", error);
      }
    };

    loadSlider();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center bg-slate-900 text-white">
        جاري تحميل السلايدر...
      </section>
    );
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          مدرسة رويا النموذجية للمتفوقين
        </h1>

        <p className="mb-10 text-xl text-gray-200 md:text-2xl">
          تعليم متميز • قيم راسخة • مستقبل واعد
        </p>

        <div className="flex gap-4">
          <a
            href="/about"
            className="rounded-xl bg-blue-600 px-8 py-3 transition hover:bg-blue-700"
          >
            تعرف علينا
          </a>

          <a
            href="/contact"
            className="rounded-xl border-2 border-white px-8 py-3 transition hover:bg-white hover:text-black"
          >
            تواصل معنا
          </a>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-3xl text-white hover:bg-white/40"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-3xl text-white hover:bg-white/40"
      >
        ❯
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}