import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MaisonSection() {
  return (
    <section
      id="maison"
      aria-labelledby="maison-title"
      className="relative isolate grid min-h-[390px] place-items-center overflow-hidden border-y border-[#bcb2a3] bg-[#06291f] px-6 py-16 text-center text-[#f7f2e8] sm:aspect-[2.68/1] sm:min-h-[420px] sm:px-10 sm:py-20"
    >
      <Image
        src="/orelia-maison.png"
        alt="A golden stone arch set into a deep emerald wall"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      <div className="max-w-[590px] sm:translate-x-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d0b36f] sm:mb-5">
          The Maison
        </p>
        <h2
          id="maison-title"
          className="font-serif text-[clamp(2rem,4.1vw,3.75rem)] leading-[1.02] tracking-[-0.025em]"
        >
          A MORE <br />
          ENDURING BEAUTY
        </h2>
        <p className="mx-auto mt-5 max-w-[470px] font-serif text-[15px] leading-[1.7] tracking-[0.04em] text-white/90 sm:mt-6 sm:text-[17px]">
          We create jewelry for life&apos;s truest moments —
          <br className="hidden sm:block" />
          with exceptional materials, responsible practices,
          <br className="hidden sm:block" />
          and a belief in beauty that endures.
        </p>
        <Button
          render={<a href="#maison" />}
          nativeButton={false}
          variant="outline"
          className="mt-7 h-[50px] min-w-[210px] rounded-none border-white/75 bg-transparent px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:border-[#d0b36f] hover:bg-[#d0b36f] hover:text-[#10251d] sm:mt-8"
        >
          Our commitment
        </Button>
      </div>
    </section>
  );
}
