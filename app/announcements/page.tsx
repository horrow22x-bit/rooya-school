import Image from "next/image";

export default function AnnouncementsPage() {
  return (
    <main className="pt-28 pb-16 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-slate-900 mb-10">
          الإعلانات
        </h1>

        {/* الإعلان الأول */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            التسجيل للعام الدراسي 2026
          </h2>

          <Image
            src="/image/registration-2026.jpg"
            alt="إعلان التسجيل"
            width={1000}
            height={600}
            className="w-full rounded-xl mb-4"
          />

          <p className="text-gray-700 text-lg leading-8">
            تعلن مدرسة رويا النموذجية للمتفوقين عن بدء استقبال طلبات التسجيل
            للعام الدراسي الجديد 2026، وفق الشروط والتعليمات المعتمدة.
          </p>
        </div>

        {/* الإعلان الثاني */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            إعلان جديد
          </h2>

          <Image
            src="/image/pp.jpeg"
            alt="إعلان جديد"
            width={1000}
            height={600}
            className="w-full rounded-xl"
          />
        </div>

      </div>
    </main>
  );
}