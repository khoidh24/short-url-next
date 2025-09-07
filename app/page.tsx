"use client";

import InputForm from "@/components/InputForm";

export default function Home() {
  return (
    <section className="max-w-lg h-screen flex flex-col justify-center items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tạo URL rút gọn</h1>

      <InputForm />
    </section>
  );
}
