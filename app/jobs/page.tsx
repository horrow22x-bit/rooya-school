export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          الوظائف
        </h1>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">

          <h2 className="text-3xl text-blue-400 font-bold mb-6">
            معلم / معلمة رياضيات
          </h2>

          <p className="text-gray-300 leading-8 mb-6">
            تعلن مدرسة رويا النموذجية للمتفوقين عن حاجتها إلى معلم أو معلمة
            رياضيات يمتلك الخبرة والكفاءة في التدريس.
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>✔️ شهادة جامعية في التخصص.</li>
            <li>✔️ خبرة لا تقل عن سنتين.</li>
            <li>✔️ مهارات تواصل ممتازة.</li>
            <li>✔️ القدرة على العمل ضمن فريق.</li>
          </ul>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl">
            قدم الآن
          </button>

        </div>

      </div>
    </main>
  );
}