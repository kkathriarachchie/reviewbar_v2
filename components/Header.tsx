import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <>
      <ThemeToggle />
      <div className="text-center text-4xl font-bold">ReviewBar</div>
      <div className="py-3 text-center text-l font-medium">
        Find Product Reviews From Barcodes!
      </div>
    </>
  );
}
