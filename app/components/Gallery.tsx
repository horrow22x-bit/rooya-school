import Image from "next/image";

const images = [
  "/image/classroom.jpg",
  "/image/graduation.jpg",
  "/image/graduation2.jpg",
  "/image/hero.jpg.jpeg",
  "/image/hero2.jpg",
  "/image/lab.jpg.jpg",
  "/image/receotion.jpg",
  "/image/yard.jpg.jpeg",
  "/image/yard2.jpg",
];

export default function Gallery() {
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
          {images.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={image}
                alt={`صورة ${index + 1}`}
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