import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <div className="mt-10">
      <Card
        className={cn(
          "flex flex-col gap-6 rounded-t-4xl rounded-b-none border py-6 shadow-sm "
        )}
      >
        <CardContent className="p-4 text-center text-2xl font-semibold text-[oklch(75.56%_0.182_142.9)]  ">
          <span>Scan a product barcode to continue</span>
        </CardContent>
      </Card>
    </div>
  );
}
