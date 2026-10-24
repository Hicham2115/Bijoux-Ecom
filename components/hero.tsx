import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-no-scroll-reveal
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-[#21140f] md:min-h-[min(760px,calc(100svh-104px))] md:items-center"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          quality={98}
          src="/orelia-hero-mobile-brown.webp"
          alt="Deux modèles portant des bijoux en or sur un fond brun profond"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          className="object-cover object-center md:hidden"
        />
        <Image
          quality={98}
          src="/orelia-hero-brown.webp"
          alt="Deux modèles portant des bijoux en or sur un fond brun"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden object-cover object-[center_35%] md:block"
        />
      </div>
      {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(33,20,15,0.08)_0%,rgba(33,20,15,0.12)_28%,rgba(33,20,15,0.7)_52%,#21140f_86%)] md:bg-[linear-gradient(90deg,rgba(33,20,15,0.72)_0%,rgba(33,20,15,0.2)_50%,transparent_80%)]" /> */}
      <div className="hero-enter hero-enter--1 orelia-eyebrow absolute left-6 top-8 flex items-center gap-3 text-[#e8d09e] md:hidden">
        <span className="h-px w-8 bg-[#d5ad5c]" />
        <span>Des bijoux pour chaque expression</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-12 pt-[clamp(250px,40svh,350px)] sm:px-[5.5%] md:py-20">
        <div className="max-w-[590px]">
          <div className="hero-enter hero-enter--1 orelia-eyebrow mb-8 hidden items-center gap-4 text-[#e8d09e] md:flex">
            <span className="h-px w-10 bg-[#d5ad5c]" />
            <span>Des bijoux pour choisir un vous plus lumineux</span>
          </div>
          <h1
            id="hero-title"
            className="hero-enter hero-enter--2 orelia-heading text-[clamp(3.45rem,15vw,4.7rem)] leading-[0.88] tracking-[-0.045em] text-[#f8f5ee] md:text-[clamp(3.6rem,8vw,7.5rem)] md:leading-[0.84]"
          >
            L’OR,
            <br />
            SANS
            <br />
            <span className="italic text-[#d5ad5c]">RÈGLES</span>
          </h1>
          <p className="hero-enter hero-enter--3 orelia-copy mt-6 max-w-[370px] text-white/85 md:mt-8">
            Des bijoux modernes pour chaque expression. Un style intemporel. Un
            monde plus ouvert.
          </p>
          <Button
            data-hero-enter="4"
            render={<Link href="/products" />}
            nativeButton={false}
            variant="outline"
            className="orelia-action orelia-button group mt-8 h-[54px] gap-5 rounded-none border-[#d5ad5c] bg-[#21140f]/30 px-6 text-white hover:border-[#e5cf9f] hover:bg-[#e5cf9f] hover:text-[#10130f] md:mt-10 md:border-white/75 md:bg-transparent"
          >
            Découvrir la collection{" "}
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
