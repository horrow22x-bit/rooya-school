"use client";

import { useState } from "react";
import GalleryForm from "./GalleryForm";
import GalleryList from "./GalleryList";

export default function GalleryAdminPage() {
  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setRefresh(!refresh);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        إدارة معرض الصور
      </h1>

      <GalleryForm onAdded={reload} />

      <GalleryList refresh={refresh} />
    </main>
  );
}