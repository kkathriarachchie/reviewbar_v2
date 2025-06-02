"use client";
import { Card, CardContent } from "@/components/ui/card";
import PanelLayout from "@/components/PanelLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { getReviews } from "./services/api";
import { Review } from "./types/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState("Not Found");
  const testDemo = () => {
    router.push(`/review/${"4796017020235"}`);
  };

  return (
    <main className="pt-8  min-h-screen flex flex-col justify-between">
      <PanelLayout>
        <div className="text-center  text-4xl font-bold">ReviewBar</div>
        <div className="py-3 text-center text-l font-medium">
          Find Product Reviews From Barcodes!
        </div>
        <div className="pb-3">
          <Card className="sm:mx-auto sm:w-[500px] ">
            <CardContent>
              <BarcodeScanner
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  if (result) {
                    setData(result.toString());
                    router.push(`/review/${result.toString()}`);
                  } else setData("Not Found");
                }}
              />
            </CardContent>
            <p>{data}</p>
          </Card>
        </div>
        <Button className="sm:mx-auto sm:w-[500px]" onClick={testDemo}>
          Show Demo Product
        </Button>
      </PanelLayout>

      <div>
        <Card
          className={cn(
            "flex flex-col gap-6 rounded-t-4xl rounded-b-none border py-6 shadow-sm"
          )}
        >
          <CardContent className="p-4 text-center text-xl font-semibold">
            Scan a product barcode to continue
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
