"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Montres",
    detail: "Des montres élégantes pour elle et lui.",
    image: "/categories/montres.png",
    alt: "Montre dorée à bracelet en cuir noir sur une pierre ivoire",
  },
  {
    name: "Boucles d’oreilles",
    detail: "Une touche de lumière pour chaque occasion.",
    image: "/categories/boucles-oreilles.png",
    alt: "Paire de créoles dorées sur une pierre ivoire",
  },
  {
    name: "Colliers",
    detail: "Des chaînes délicates à porter en superposition.",
    image: "/categories/colliers.png",
    alt: "Collier chaîne en or disposé en ovale sur une pierre ivoire",
  },
  {
    name: "Bracelets",
    detail: "Des formes sculpturales pour le quotidien.",
    image: "/categories/bracelets.png",
    alt: "Bracelet manchette doré sur une pierre ivoire",
  },
  {
    name: "Colis",
    detail: "Un écrin prêt à offrir, pensé dans les moindres détails.",
    image: "/categories/colis.png",
    alt: "Coffret cadeau ivoire noué d’un ruban noir et doré",
  },
  {
    name: "Bagues",
    detail: "Des créations faites pour vous accompagner.",
    image: "/categories/bagues.png",
    alt: "Bague dorée sertie d’une émeraude sur une pierre ivoire",
  },
  {
    name: "Ensemble",
    detail: "Un pack assorti de boucles, bague et collier.",
    image: "/categories/ensemble.png",
    alt: "Ensemble de bijoux dorés pour femme",
  },
];

export function CategorySection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCategories(direction: -1 | 1) {
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
      id="categories"
      aria-labelledby="categories-title"
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
              id="categories-title"
              className="orelia-eyebrow max-[360px]:tracking-[0.14em]"
            >
              Nos catégories
            </h2>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir les catégories précédentes"
              onClick={() => scrollCategories(-1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#07261b] hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir plus de catégories"
              onClick={() => scrollCategories(1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#07261b] hover:text-white"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="category-carousel flex gap-4 overflow-x-auto pb-3 sm:gap-5"
          aria-label="Catégories de bijoux"
        >
          {categories.map((category) => (
            <article key={category.name} data-scroll-reveal-item className="category-card min-w-0">
              <div className="group block">
                <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                  <Image quality={90}
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                </div>
                <h3 className="orelia-eyebrow mt-3 sm:mt-4">
                  {category.name}
                </h3>
              </div>
              <p className="mt-1 font-serif text-[13px] leading-[1.5] text-[#5f5a51] sm:text-[14px]">
                {category.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
