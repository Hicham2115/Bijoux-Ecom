"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { localProducts } from "@/lib/local-products";

export function FeaturedJewelrySection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollProducts(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="collection"
      aria-labelledby="featured-jewelry-title"
      data-no-scroll-reveal
      className="bg-[#f5f1e9] py-11 text-[#171714] sm:py-14"
    >
      <div className="mx-auto w-full px-5 sm:px-[3.6%]">
        <div className="mb-7 flex items-center justify-between gap-4 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-8">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-[#b99045] sm:w-14"
            />
            <h2
              id="featured-jewelry-title"
              className="orelia-eyebrow max-[360px]:tracking-[0.14em]"
            >
              Nos meilleures ventes
            </h2>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir les bijoux précédents"
              onClick={() => scrollProducts(-1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#3b2a1c] hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir plus de bijoux"
              onClick={() => scrollProducts(1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#3b2a1c] hover:text-white"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="featured-jewelry-carousel flex gap-4 overflow-x-auto pb-3 sm:gap-5"
          aria-label="Nos meilleures ventes"
        >
          {localProducts.map((product) => (
            <article
              key={product.id}
              className="category-card featured-jewelry-card min-w-0"
            >
              <div className="group">
                <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                  <Image
                    quality={90}
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                </div>
                <h3 className="orelia-eyebrow mt-3 sm:mt-4">{product.title}</h3>
                <p className="mt-1 block font-serif text-[13px] leading-[1.5] text-[#5f5a51] sm:text-[14px]">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3b2a1c] transition-colors hover:text-[#927342] sm:text-[11px]"
          >
            Voir tous les bijoux <span aria-hidden="true" className="ml-3 text-base">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
