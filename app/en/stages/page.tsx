import Link from "next/link";

export default function StagesPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-slate-950">

      {/* Header */}
      <section className="bg-slate-900 pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Educational Stages
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Roya Model School provides a supportive educational journey
            designed to help students achieve excellence at every stage.
          </p>
        </div>
      </section>

      {/* Stages */}
      <section className="bg-white py-20 text-slate-900">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8">

            {/* Primary */}
            <div className="rounded-3xl bg-white p-8 text-center shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="text-7xl mb-6">
                🎒
              </div>

              <h2 className="text-3xl font-bold mb-5">
                Primary School
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                We help young students build a strong foundation in
                knowledge, learning skills, values and positive behavior.
              </p>

              <div className="mt-6 space-y-2 text-gray-700">
                <p>✓ Strong academic foundation</p>
                <p>✓ Creative learning</p>
                <p>✓ Personal development</p>
              </div>

            </div>

            {/* Middle */}
            <div className="rounded-3xl bg-white p-8 text-center shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="text-7xl mb-6">
                📚
              </div>

              <h2 className="text-3xl font-bold mb-5">
                Middle School
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                Students develop critical thinking, independence and
                advanced learning skills while preparing for the next
                academic stage.
              </p>

              <div className="mt-6 space-y-2 text-gray-700">
                <p>✓ Critical thinking</p>
                <p>✓ Scientific skills</p>
                <p>✓ Creativity and independence</p>
              </div>

            </div>

            {/* High */}
            <div className="rounded-3xl bg-white p-8 text-center shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="text-7xl mb-6">
                🎓
              </div>

              <h2 className="text-3xl font-bold mb-5">
                High School
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                We prepare students for university and future careers while
                supporting academic excellence and personal growth.
              </p>

              <div className="mt-6 space-y-2 text-gray-700">
                <p>✓ Academic excellence</p>
                <p>✓ University preparation</p>
                <p>✓ Future career readiness</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            Our Educational Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-5">
                🧠
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Critical Thinking
              </h3>

              <p className="text-gray-600 leading-7">
                Encouraging students to analyze, question and find creative
                solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-5">
                🔬
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Practical Learning
              </h3>

              <p className="text-gray-600 leading-7">
                Connecting knowledge with practical experiences and real-world
                applications.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-5">
                🌟
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Student Development
              </h3>

              <p className="text-gray-600 leading-7">
                Supporting academic, social and personal growth throughout
                the educational journey.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Back Home */}
      <section className="bg-slate-950 py-12 text-center">
        <Link
          href="/en"
          className="inline-block rounded-xl bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </section>

    </main>
  );
}