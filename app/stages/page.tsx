export default function StagesPage() {
  const stages = [
    {
      title: "المرحلة الابتدائية",
      desc: "بناء الأساس العلمي والمهاري للطالب في بيئة تعليمية محفزة.",
    },
    {
      title: "المرحلة المتوسطة",
      desc: "تنمية التفكير والإبداع واكتساب المهارات الأكاديمية.",
    },
    {
      title: "المرحلة الثانوية",
      desc: "إعداد الطلبة للجامعة والحياة العملية وتحقيق التفوق.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-14">
          المراحل الدراسية
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                {stage.title}
              </h2>

              <p className="text-gray-300 leading-8">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}