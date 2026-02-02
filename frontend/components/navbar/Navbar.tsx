"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav
      className="top-0 left-0 w-full flex items-center justify-between px-6 py-1.5 
                    bg-[#141415] shadow-sm z-50 backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-white font-mono">Recon</span>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="link" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/search">Search</Link>
        </Button>
      </div>
    </nav>
  );
}
