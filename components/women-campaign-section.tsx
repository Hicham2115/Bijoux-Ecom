import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WomenCampaignSection() {
  return (
    <section
      id="women"
      aria-labelledby="women-campaign-title"
      className="relative isolate flex min-h-[500px] items-center overflow-hidden border-y border-[#bcb2a3] bg-[#eee8dd] text-[#171512] sm:min-h-[min(590px,65vw)]"
    >
      <Image
        src="/orelia-womens-campaign.png"
        alt="A model wearing Orélia gold jewelry against a warm ivory backdrop"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[37%_center] sm:object-center"
      />

      <div className="mx-auto w-full px-6 py-16 sm:py-20 sm:pl-[4.8%] sm:pr-[2%]">
        <div className="ml-auto max-w-[500px]">
          <div className="orelia-eyebrow mb-8 flex items-center gap-5 text-[#27231c]">
            <span className="h-[3px] w-12 bg-[#b58a42]" />
            <span>Women&apos;s jewelry</span>
          </div>
          <h2
            id="women-campaign-title"
            className="orelia-heading text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[0.98]"
          >
            BEAUTY
            <br />
            IN EVERY FORM
          </h2>
          <p className="orelia-copy mt-5 max-w-[410px] text-[#37332d]">
            Icons, essentials, and new expressions
            <br className="hidden sm:block" /> for every part of you.
          </p>
          <Button
            render={<a href="#collection" />}
            nativeButton={false}
            className="orelia-action mt-9 h-[54px] min-w-[260px] rounded-none border border-[#06402e] bg-[#06402e] px-7 text-white hover:border-[#0b563e] hover:bg-[#0b563e] sm:mt-10"
          >
            Shop women&apos;s{" "}
            <ArrowRight className="ml-8 size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
