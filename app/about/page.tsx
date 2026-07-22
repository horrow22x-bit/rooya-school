import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* عنوان الصفحة */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            من نحن
          </h1>

          <p className="text-xl">
            مدرسة رويا النموذجية للمتفوقين
          </p>
        </div>
      </section>

      {/* نبذة عن المدرسة */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
              نبذة عن المدرسة
            </h2>

            <p className="text-slate-900 text-xl leading-10 font-medium">
              تسعى مدرسة رويا النموذجية للمتفوقين إلى تقديم تعليم عالي الجودة في
              بيئة تعليمية حديثة وآمنة، مع التركيز على تنمية شخصية الطالب
              علميًا وأخلاقيًا، وإعداد جيل قادر على الإبداع والتميز وخدمة
              المجتمع، من خلال مناهج حديثة وكادر تعليمي متميز وأنشطة متنوعة
              تساهم في بناء مستقبل مشرق لطلابنا.
            </p>
          </div>

          <Image
            src="/image/hero2.jpg"
            alt="مدرسة رويا"
            width={700}
            height={500}
            className="rounded-3xl shadow-2xl"
          />

        </div>
      </section>

      {/* الرؤية والرسالة */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          <div className="bg-blue-600 text-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold mb-5">
              رؤيتنا
            </h3>

            <p className="leading-8 text-lg">
              إعداد جيل متميز علميًا وأخلاقيًا يمتلك المعرفة والمهارات اللازمة
              لبناء مستقبله وخدمة مجتمعه.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold mb-5">
              رسالتنا
            </h3>

            <p className="leading-8 text-lg">
              توفير بيئة تعليمية حديثة ومحفزة تعتمد على الجودة والابتكار،
              وتسهم في تنمية شخصية الطالب أكاديميًا وسلوكيًا.
            </p>
          </div>

        </div>
      </section>

      {/* قيمنا */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            قيمنا
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-slate-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-slate-900">
                التميز
              </h3>
            </div>

            <div className="bg-slate-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-slate-900">
                التعاون
              </h3>
            </div>

            <div className="bg-slate-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-slate-900">
                التعلم
              </h3>
            </div>

            <div className="bg-slate-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-slate-900">
                الإبداع
              </h3>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}