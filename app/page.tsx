"use client";
import PanelLayout from "@/components/PanelLayout";
import { Header } from "@/components/Header";
import { BarcodeArea } from "@/components/BarcodeScanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="pt-8 min-h-screen flex flex-col justify-between">
      <PanelLayout>
        <Header />
        <BarcodeArea />
      </PanelLayout>
      <Footer />
    </main>
  );
}
