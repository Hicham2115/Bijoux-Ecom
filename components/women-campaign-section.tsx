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
      <Image quality={90}
        src="/orelia-womens-campaign.webp"
        alt="Une mannequin portant des bijoux Orélia en or sur un fond ivoire chaleureux"
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover object-center md:block"
      />
      <div className="relative h-[clamp(260px,62vw,420px)] w-full md:hidden">
        <Image quality={90}
          src="/orelia-womens-campaign.webp"
          alt="Une mannequin portant des bijoux Orélia en or sur un fond ivoire chaleureux"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-[35%_35%]"
        />
      </div>

      <div className="relative mx-auto w-full px-6 py-11 sm:px-[4.8%] md:py-20 md:pr-[2%]">
        <div className="ml-auto max-w-[500px]">
          <div className="orelia-eyebrow mb-8 flex items-center gap-5 text-[#27231c]">
            <span className="h-[3px] w-12 bg-[#b58a42]" />
            <span>Bijoux pour femme</span>
          </div>
          <h2
            id="women-campaign-title"
            className="orelia-heading text-[clamp(2.2rem,10vw,2.75rem)] leading-[0.98] md:text-[clamp(2.75rem,4.8vw,4.5rem)]"
          >
            LA BEAUTÉ
            <br />
            EN TOUTE <br className="md:hidden" />CHOSE
          </h2>
          <p className="orelia-copy mt-5 max-w-[410px] text-[#37332d]">
            Des icônes, des essentiels et de nouvelles façons de s’exprimer
            <br className="hidden sm:block" /> pour toutes vos facettes.
          </p>
          <Button
            render={<a href="#collection" />}
            nativeButton={false}
            className="orelia-action orelia-button group mt-9 h-[54px] gap-5 rounded-none border border-[#5a3a20] bg-[#5a3a20] px-6 text-white hover:border-[#76522c] hover:bg-[#76522c] sm:mt-10"
          >
            Découvrir les bijoux femme{" "}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
