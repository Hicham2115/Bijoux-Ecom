import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WomenCampaignSection() {
  return (
    <section
      id="women"
      aria-labelledby="women-campaign-title"
      className="relative isolate flex flex-col overflow-hidden border-y border-[#bcb2a3] bg-[#eee8dd] text-[#171512] md:min-h-[min(590px,65vw)] md:flex-row md:items-center"
    >
      <Image
        src="/orelia-womens-campaign.png"
        alt="A model wearing Orélia gold jewelry against a warm ivory backdrop"
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover object-center md:block"
      />
      <div className="relative h-[clamp(260px,62vw,420px)] w-full md:hidden">
        <Image
          src="/orelia-womens-campaign.png"
          alt="A model wearing Orélia gold jewelry against a warm ivory backdrop"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-[35%_35%]"
        />
      </div>

      <div className="relative mx-auto w-full px-6 py-11 sm:px-[4.8%] md:py-20 md:pr-[2%]">
        <div className="ml-auto max-w-[500px]">
          <div className="orelia-eyebrow mb-8 flex items-center gap-5 text-[#27231c]">
            <span className="h-[3px] w-12 bg-[#b58a42]" />
            <span>Women&apos;s jewelry</span>
          </div>
          <h2
            id="women-campaign-title"
            className="orelia-heading text-[clamp(2.2rem,10vw,2.75rem)] leading-[0.98] md:text-[clamp(2.75rem,4.8vw,4.5rem)]"
          >
            BEAUTY
            <br />
            IN EVERY <br className="md:hidden" />FORM
          </h2>
          <p className="orelia-copy mt-5 max-w-[410px] text-[#37332d]">
            Icons, essentials, and new expressions
            <br className="hidden sm:block" /> for every part of you.
          </p>
          <Button
            render={<a href="#collection" />}
            nativeButton={false}
            className="orelia-action orelia-button group mt-9 h-[54px] gap-5 rounded-none border border-[#06402e] bg-[#06402e] px-6 text-white hover:border-[#0b563e] hover:bg-[#0b563e] sm:mt-10"
          >
            Shop women&apos;s{" "}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
