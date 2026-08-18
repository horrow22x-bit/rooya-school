import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roya Model School for Outstanding Students",
  description:
    "The official website of Roya Model School for Outstanding Students.",
  alternates: {
    canonical: "https://www.roya-school.info/en",
    languages: {
      ar: "https://www.roya-school.info/",
      en: "https://www.roya-school.info/en",
    },
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" dir="ltr">
      {children}
    </div>
  );
}