export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      {/* عنوان الصفحة */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-xl">
            نحن سعداء بالإجابة عن جميع استفساراتكم
          </p>
        </div>
      </section>

      {/* المحتوى */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* معلومات التواصل */}
          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              معلومات التواصل
            </h2>

            <div className="space-y-8">

              {/* العنوان */}
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold text-blue-700">
                  📍 العنوان
                </span>

                <span className="text-gray-700">
                  طريق جنديرس - عفرين
                </span>
              </div>

              {/* الهاتف */}
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold text-blue-700">
                  📞 الهاتف
                </span>

                <span
                  dir="ltr"
                  className="text-gray-700 font-medium"
                >
                  +90 535 492 69 37
                </span>
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold text-blue-700">
                  📧 البريد الإلكتروني
                </span>

                <span
                  dir="ltr"
                  className="text-gray-700 break-all text-sm"
                >
                  royaprivatemodelschool@gmail.com
                </span>
              </div>

              {/* الدوام */}
              <div className="flex justify-between items-start">
                <span className="font-bold text-blue-700">
                  🕒 أوقات الدوام
                </span>

                <div className="text-right text-gray-700">
                  <p>من الأحد إلى الخميس</p>
                  <p>8:00 صباحًا - 3:00 مساءً</p>
                </div>
              </div>

            </div>
          </div>

          {/* الخريطة */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=36.4700148,36.8191924&z=17&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>

        </div>
      </section>
    </main>
  );
}