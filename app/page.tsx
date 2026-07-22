import HeroComponent from "./components/HeroComponent";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <>
      <HeroComponent />

      {/* لماذا تختار مدرسة رويا */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-14">
            لماذا تختار مدرسة رويا النموذجية؟
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🎓</div>
              <h3 className="text-white text-2xl font-bold mb-3">
                تعليم متميز
              </h3>
              <p className="text-gray-400">
                مناهج حديثة وأساليب تدريس متطورة لتنمية قدرات الطلاب.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">👨‍🏫</div>
              <h3 className="text-white text-2xl font-bold mb-3">
                كادر محترف
              </h3>
              <p className="text-gray-400">
                نخبة من المعلمين ذوي الخبرة والكفاءة العالية.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🏆</div>
              <h3 className="text-white text-2xl font-bold mb-3">
                رعاية المتفوقين
              </h3>
              <p className="text-gray-400">
                برامج خاصة لدعم الموهوبين وتنمية مهاراتهم.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">⚽</div>
              <h3 className="text-white text-2xl font-bold mb-3">
                أنشطة متنوعة
              </h3>
              <p className="text-gray-400">
                رياضية وثقافية وعلمية لتنمية شخصية الطالب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* المراحل الدراسية */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-14">
            المراحل الدراسية
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">🎒</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                المرحلة الابتدائية
              </h3>
              <p className="text-gray-600">
                بناء أساس قوي في العلوم والمهارات والقيم.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">📚</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                المرحلة المتوسطة
              </h3>
              <p className="text-gray-600">
                تنمية التفكير والإبداع والاعتماد على النفس.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-5">🎓</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                المرحلة الثانوية
              </h3>
              <p className="text-gray-600">
                إعداد الطلاب للجامعة وتحقيق التميز الأكاديمي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* آخر الأخبار والإعلانات */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-14">
            آخر الأخبار والإعلانات
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <span className="text-blue-600 font-semibold">
                10 سبتمبر 2025
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-3">
                بدء التسجيل للعام الدراسي الجديد
              </h3>
              <p className="text-gray-600">
                تعلن المدرسة عن فتح باب التسجيل واستقبال الطلاب الجدد.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <span className="text-blue-600 font-semibold">
                15 سبتمبر 2025
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-3">
                تكريم الطلبة المتفوقين
              </h3>
              <p className="text-gray-600">
                حفل خاص لتكريم الطلبة المتميزين في مختلف المراحل الدراسية.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <span className="text-blue-600 font-semibold">
                20 سبتمبر 2025
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-3">
                انطلاق الأنشطة الرياضية
              </h3>
              <p className="text-gray-600">
                بدء البطولات والأنشطة الرياضية والثقافية لجميع الطلاب.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/announcements"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
            >
              عرض جميع الإعلانات
            </a>
          </div>
        </div>
      </section>

      <Gallery />
    </>
  );
}