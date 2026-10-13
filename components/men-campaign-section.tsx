import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MenCampaignSection() {
  return (
    <section
      id="men"
      aria-labelledby="men-campaign-title"
      className="relative isolate flex min-h-[500px] items-center overflow-hidden border-y border-white/20 bg-[#27170f] text-white sm:min-h-[min(590px,65vw)]"
    >
      <Image
        src="/orelia-mens-campaign.png"
        alt="A model wearing Orélia gold jewelry against a dark brown backdrop"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[62%_center] sm:object-center"
      />

      <div className="mx-auto w-full px-6 py-16 sm:px-[4.8%] sm:py-20">
        <div className="max-w-[540px]">
          <div className="orelia-eyebrow mb-8 flex items-center gap-5 text-white/90">
            <span className="h-[3px] w-12 bg-[#c59a4d]" />
            <span>Men&apos;s jewelry</span>
          </div>
          <h2
            id="men-campaign-title"
            className="orelia-heading text-[clamp(3.5rem,7vw,6.25rem)] leading-[0.9] tracking-[-0.04em]"
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
            className="orelia-action mt-9 h-[54px] min-w-[245px] rounded-none border-white/75 bg-transparent px-7 text-white hover:border-[#e5cf9f] hover:bg-[#e5cf9f] hover:text-[#10130f] sm:mt-10"
          >
            Shop men&apos;s{" "}
            <ArrowRight className="ml-8 size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
