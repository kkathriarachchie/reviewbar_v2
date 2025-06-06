"use client";
import { Header } from "@/components/Header";
import { BarcodeArea } from "@/components/BarcodeScanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="pt-8 min-h-screen flex flex-col justify-between">
      <div className="flex flex-col px-6">
        <Header />
        <BarcodeArea />
      </div>
      <Footer />
    </main>
  );
}
