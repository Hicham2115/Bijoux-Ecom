import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MenCampaignSection() {
  return (
    <section
      id="men"
      aria-labelledby="men-campaign-title"
      className="relative isolate flex flex-col overflow-hidden border-y border-white/20 bg-[#27170f] text-white md:min-h-[min(590px,65vw)] md:flex-row md:items-center"
    >
      <Image
        src="/orelia-mens-campaign.webp"
        alt="A model wearing Orélia gold jewelry against a dark brown backdrop"
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover object-center md:block"
      />
      <div className="relative h-[clamp(260px,62vw,420px)] w-full md:hidden">
        <Image
          src="/orelia-mens-campaign.webp"
          alt="A model wearing Orélia gold jewelry against a dark brown backdrop"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-[72%_36%]"
        />
      </div>

      <div className="relative mx-auto w-full px-6 py-11 sm:px-[4.8%] md:py-20">
        <div className="max-w-[540px]">
          <div className="orelia-eyebrow mb-8 flex items-center gap-5 text-white/90">
            <span className="h-[3px] w-12 bg-[#c59a4d]" />
            <span>Men&apos;s jewelry</span>
          </div>
          <h2
            id="men-campaign-title"
            className="orelia-heading text-[clamp(2.75rem,13vw,3.5rem)] leading-[0.92] tracking-[-0.04em] md:text-[clamp(3.5rem,7vw,6.25rem)] md:leading-[0.9]"
          >
            STRENGTH
            <br />
            IN STYLE
          </h2>
          <p className="orelia-copy mt-5 max-w-[390px] text-white/90">
            Refined essentials for every perspective.
            <br className="hidden sm:block" /> Bold. Modern. Always timeless.
          </p>
          <Button
            render={<a href="#collection" />}
            nativeButton={false}
            variant="outline"
            className="orelia-action orelia-button group mt-9 h-[54px] gap-5 rounded-none border-white/75 bg-transparent px-6 text-white hover:border-[#e5cf9f] hover:bg-[#e5cf9f] hover:text-[#10130f] sm:mt-10"
          >
            Shop men&apos;s{" "}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              strokeWidth={1.5}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
