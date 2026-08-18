import Link from "next/link";
import Image from "next/image";

export default function EnglishHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/image/hero.jpg.jpeg"
          alt="Roya Model School"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Roya Model School for Outstanding Students
          </h1>

          <p className="mb-10 text-xl text-gray-200 md:text-2xl">
            Excellence in Education • Strong Values • A Promising Future
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/en/about"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700"
            >
              About Us
            </Link>

            <Link
              href="/en/contact"
              className="rounded-xl border-2 border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why Roya */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-14 text-center text-4xl font-bold">
            Why Choose Roya School?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-slate-900 p-8 text-center shadow-lg transition hover:scale-105">
              <div className="mb-5 text-5xl">🎓</div>

              <h3 className="mb-3 text-2xl font-bold">
                Excellent Education
              </h3>

              <p className="text-gray-400">
                Modern curricula and advanced teaching methods to develop
                students' abilities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-8 text-center shadow-lg transition hover:scale-105">
              <div className="mb-5 text-5xl">👨‍🏫</div>

              <h3 className="mb-3 text-2xl font-bold">
                Professional Staff
              </h3>

              <p className="text-gray-400">
                A team of experienced and highly qualified teachers.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-8 text-center shadow-lg transition hover:scale-105">
              <div className="mb-5 text-5xl">🏆</div>

              <h3 className="mb-3 text-2xl font-bold">
                Supporting Excellence
              </h3>

              <p className="text-gray-400">
                Special programs designed to support talented and outstanding
                students.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-8 text-center shadow-lg transition hover:scale-105">
              <div className="mb-5 text-5xl">⚽</div>

              <h3 className="mb-3 text-2xl font-bold">
                Diverse Activities
              </h3>

              <p className="text-gray-400">
                Sports, cultural and scientific activities that help build
                students' personalities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Educational Stages */}
      <section className="bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-14 text-center text-4xl font-bold">
            Educational Stages
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-8 text-center shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-5 text-6xl">🎒</div>

              <h3 className="mb-3 text-2xl font-bold">
                Elementary School
              </h3>

              <p className="text-gray-600">
                Building a strong foundation in science, skills and values.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-5 text-6xl">📚</div>

              <h3 className="mb-3 text-2xl font-bold">
                Middle School
              </h3>

              <p className="text-gray-600">
                Developing critical thinking, creativity and independence.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-5 text-6xl">🎓</div>

              <h3 className="mb-3 text-2xl font-bold">
                High School
              </h3>

              <p className="text-gray-600">
                Preparing students for university and academic excellence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-slate-100 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-14 text-center text-4xl font-bold">
            Latest News & Announcements
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-2xl">
              <span className="font-semibold text-blue-600">
                September 10, 2025
              </span>

              <h3 className="mt-3 mb-3 text-2xl font-bold">
                Registration Opens for the New Academic Year
              </h3>

              <p className="text-gray-600">
                The school announces the opening of registration for new
                students.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-2xl">
              <span className="font-semibold text-blue-600">
                September 15, 2025
              </span>

              <h3 className="mt-3 mb-3 text-2xl font-bold">
                Honoring Outstanding Students
              </h3>

              <p className="text-gray-600">
                A special ceremony to honor outstanding students from
                different educational stages.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-2xl">
              <span className="font-semibold text-blue-600">
                September 20, 2025
              </span>

              <h3 className="mt-3 mb-3 text-2xl font-bold">
                Sports Activities Begin
              </h3>

              <p className="text-gray-600">
                Sports and cultural activities begin for all students.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              href="/en/announcements"
              className="inline-block rounded-xl bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
            >
              View All Announcements
            </Link>
          </div>

        </div>
      </section>

      {/* Language Switch */}
      <section className="bg-slate-950 py-10 text-center">
        <p className="mb-4 text-gray-400">
          Visit the Arabic version
        </p>

        <Link
          href="/"
          className="inline-block rounded-xl border border-white px-8 py-3 text-white transition hover:bg-white hover:text-black"
        >
          العربية
        </Link>
      </section>

    </main>
  );
}