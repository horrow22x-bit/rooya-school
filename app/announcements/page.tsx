import Image from "next/image";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center text-slate-900 mb-4">
          الإعلانات
        </h1>

        <p className="text-center text-gray-600 mb-10">
          آخر أخبار وإعلانات مدرسة رويا النموذجية للمتفوقين
        </p>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <Image
            src="/image/registration-2026.jpg"
            alt="إعلان التسجيل"
            width={1022}
            height={1536}
            priority
            className="w-full h-auto"
          />

          <div className="p-8">

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              العام الدراسي 2026 / 2027
            </span>

            <h2 className="text-3xl font-bold mb-4">
              بدء التسجيل للعام الدراسي الجديد
            </h2>

            <p className="text-gray-700 leading-8">
              تعلن مدرسة رويا النموذجية للمتفوقين عن بدء التسجيل للعام الدراسي
              الجديد 2026 / 2027. يمكنكم الاطلاع على تفاصيل الأقساط والمراحل
              الدراسية من خلال الإعلان أعلاه، أو التواصل مع إدارة المدرسة
              للحصول على المزيد من المعلومات.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}