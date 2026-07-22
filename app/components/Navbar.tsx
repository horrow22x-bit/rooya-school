import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ROYA School"
            width={120}
            height={120}
          />
          <span className="text-white text-2xl font-bold">
            مدرسة رويا النموذجية للمتفوقين
          </span>
        </Link>

        <div className="flex gap-8 text-white font-semibold">
          <Link href="/">الرئيسية</Link>
          <Link href="/about">من نحن</Link>
          <Link href="/stages">المراحل الدراسية</Link>
          <Link href="/announcements">الإعلانات</Link>
          <Link href="/jobs">الوظائف</Link>
          <Link href="/contact">تواصل معنا</Link>
        </div>

      </div>
    </nav>
  );
}