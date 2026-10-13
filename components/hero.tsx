import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[680px] items-center overflow-hidden sm:min-h-[min(760px,calc(100svh-104px))]"
    >
      <div className="absolute inset-0 -z-20 bg-[#073b2a]" />
      <div
        className="absolute inset-0 -z-10 bg-cover bg-[center_35%] sm:bg-center"
        style={{ backgroundImage: "url('/orelia-hero.png')" }}
        role="img"
        aria-label="Two models wearing gold jewelry against an emerald background"
      />

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-20 sm:px-[5.5%] sm:py-20">
        <div className="max-w-[590px]">
          <div className="mb-8 flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-[#e8d09e] sm:text-[10px]">
            <span className="h-px w-10 bg-[#d5ad5c]" />
            <span>Jewelry for a choice, a brighter you</span>
          </div>
          <h1
            id="hero-title"
            className="font-serif text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.84] tracking-[-0.045em] text-[#f8f5ee]"
          >
            GOLD,
            <br />
            WITHOUT
            <br />
            <span className="italic text-[#d5ad5c]">RULES</span>
          </h1>
          <p className="mt-8 max-w-[370px] font-serif text-[17px] leading-[1.55] text-white/85 sm:text-[19px]">
            Modern jewelry for every expression. Timeless design. A more open
            world.
          </p>
          <Button
            render={<a href="#collection" />}
            nativeButton={false}
            variant="outline"
            className="mt-10 h-[54px] rounded-none border-white/75 bg-transparent px-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white hover:border-[#e5cf9f] hover:bg-[#e5cf9f] hover:text-[#10130f] sm:min-w-[290px]"
          >
            Shop the collection{" "}
            <ArrowRight className="ml-4 size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
