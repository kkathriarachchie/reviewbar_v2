import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
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
  );
}
