"use client";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

// basic landing page
export default function app() {
  return (
    <div>
      <Navbar></Navbar>
      <section className="min-h-[60vh] grid place-items-center pt-24">
        <div className="grid gap-8 text-center">
          <h1 className="text-9xl font-bold">
            <Typewriter
              words={["Tendencies.", "Weaknesses.", "Traits."]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="text-xl text-muted-foreground ">
            Triumph Fighters with Data
          </p>
          <div>
            <Button className="rounded-full" variant="default" asChild>
              <Link href="/search"> Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
}
