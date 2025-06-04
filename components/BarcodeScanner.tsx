import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BarcodeScanner from "react-qr-barcode-scanner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BarcodeArea() {
  const router = useRouter();
  const [data, setData] = useState("Not Found");

  const testDemo = () => {
    router.push(`/review/${"4796017020235"}`);
  };

  return (
    <>
      <div className="pb-3">
        <Card className="sm:mx-auto sm:w-[500px]">
          <CardContent>
            <div className="relative">
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
              <div className="scan-line absolute top-0 left-0 w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button
        className="sm:mx-auto sm:w-[500px] bg-[oklch(75.56%_0.182_142.9)] w-full mx-auto py-6 text-lg font-medium "
        onClick={testDemo}
      >
        Show Demo Product
      </Button>
    </>
  );
}
