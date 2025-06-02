"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="pt-6 px-6 min-h-screen flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-[calc(100vh-180px)]">
          <Card className="p-4 mb-6">
            <Skeleton className="h-24 w-full" />
          </Card>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex justify-between mb-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-20 w-full" />
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 py-4 bg-background">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
