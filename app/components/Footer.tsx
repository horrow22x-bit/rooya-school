import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">

        {/* نبذة */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            مدرسة رويا النموذجية للمتفوقين
          </h3>

          <p className="text-gray-400 leading-8">
            تعليم متميز، قيم راسخة، ومستقبل واعد.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            روابط سريعة
          </h3>

          <div className="flex flex-col gap-2 text-gray-300">
            <Link href="/" className="hover:text-blue-400 transition">
              الرئيسية
            </Link>

            <Link href="/about" className="hover:text-blue-400 transition">
              من نحن
            </Link>

            <Link href="/stages" className="hover:text-blue-400 transition">
              المراحل الدراسية
            </Link>

            <Link
              href="/announcements"
              className="hover:text-blue-400 transition"
            >
              الإعلانات
            </Link>

            <Link href="/jobs" className="hover:text-blue-400 transition">
              الوظائف
            </Link>

            <Link href="/contact" className="hover:text-blue-400 transition">
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* معلومات التواصل */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            معلومات التواصل
          </h3>

          <p className="text-gray-300">
            📍 طريق جنديرس - عفرين
          </p>

          <p className="text-gray-300 mt-2">
            📞{" "}
            <span dir="ltr" className="inline-block">
              +90 535 492 69 37
            </span>
          </p>

          <p className="text-gray-300 mt-2">
            ✉️{" "}
            <span dir="ltr" className="inline-block break-all">
              royaprivatemodelschool@gmail.com
            </span>
          </p>
        </div>

      </div>

      <div className="border-t border-slate-700 py-4 text-center text-gray-400">
        © 2026 مدرسة رويا النموذجية للمتفوقين - جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}