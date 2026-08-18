import Link from "next/link";

export default function AboutPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-slate-950">

      {/* Header */}
      <section className="bg-slate-900 pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Roya Model School
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A distinguished educational institution dedicated to excellence,
            creativity and building a promising future for our students.
          </p>
        </div>
      </section>

      {/* About School */}
      <section className="bg-white py-20 text-slate-900">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Who We Are
              </h2>

              <p className="text-lg text-gray-600 leading-8 mb-6">
                Roya Model School for Outstanding Students is committed to
                providing a high-quality educational environment that helps
                students discover their abilities and achieve their goals.
              </p>

              <p className="text-lg text-gray-600 leading-8">
                We believe that education is not only about academic
                achievement, but also about developing character, creativity,
                responsibility and confidence.
              </p>
            </div>

            <div className="bg-slate-100 rounded-3xl p-10 shadow-xl text-center">
              <div className="text-7xl mb-6">
                🎓
              </div>

              <h3 className="text-3xl font-bold mb-4">
                Our Vision
              </h3>

              <p className="text-gray-600 text-lg leading-8">
                To become a leading educational institution that prepares
                outstanding students for a successful and meaningful future.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-900 mb-14">
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl mb-5">
                📚
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Quality Education
              </h3>

              <p className="text-gray-600 leading-7">
                Providing modern education and effective learning methods
                that meet the needs of our students.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl mb-5">
                💡
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Creativity
              </h3>

              <p className="text-gray-600 leading-7">
                Encouraging creativity, innovation and critical thinking
                inside and outside the classroom.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl mb-5">
                🌟
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Student Excellence
              </h3>

              <p className="text-gray-600 leading-7">
                Supporting every student to reach their full academic and
                personal potential.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-900 mb-14">
            Our Values
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
              Excellence
            </span>

            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
              Responsibility
            </span>

            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
              Creativity
            </span>

            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
              Respect
            </span>

            <span className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
              Cooperation
            </span>

          </div>

        </div>
      </section>

      {/* Back */}
      <section className="bg-slate-950 py-12 text-center">
        <Link
          href="/en"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
        >
          Back to Home
        </Link>
      </section>

    </main>
  );
}