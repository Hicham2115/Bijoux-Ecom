"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Solis Ring",
    detail: "18K gold, emerald",
    price: "$2,450",
    image: "/products/solis-ring.png",
  },
  {
    name: "Atlas Chain",
    detail: "18K gold",
    price: "$3,800",
    image: "/products/atlas-chain.png",
  },
  {
    name: "Forma Cuff",
    detail: "18K gold",
    price: "$4,200",
    image: "/products/forma-cuff.png",
  },
  {
    name: "Lumière Earrings",
    detail: "18K gold",
    price: "$1,950",
    image: "/products/lumiere-earrings.png",
  },
  {
    name: "Noir Signet",
    detail: "18K gold, onyx",
    price: "$2,100",
    image: "/products/noir-signet.png",
  },
  {
    name: "Éclat Ring",
    detail: "18K gold, diamonds",
    price: "$3,600",
    image: "/products/eclat-ring.png",
  },
];

export function FeaturedJewelrySection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

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
              Featured jewelry
            </h2>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="icon"
              aria-label="Show previous jewelry"
              onClick={() => scrollProducts(-1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#07261b] hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Show more jewelry"
              onClick={() => scrollProducts(1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#07261b] hover:text-white"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="featured-jewelry-carousel flex gap-4 overflow-x-auto pb-3 sm:gap-5"
          aria-label="Featured jewelry products"
        >
          {products.map((product) => (
            <article
              key={product.name}
              className="category-card featured-jewelry-card min-w-0"
            >
              <div className="group block">
                <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                </div>
                <h3 className="orelia-eyebrow mt-3 sm:mt-4">{product.name}</h3>
              </div>
              <p className="mt-1 font-serif text-[13px] leading-[1.5] text-[#5f5a51] sm:text-[14px]">
                {product.detail}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2 sm:mt-3">
                <p className="text-[14px] font-semibold sm:text-[16px]">
                  {product.price}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    addedProducts.includes(product.name)
                      ? `${product.name} is in your bag`
                      : `Add ${product.name} to your bag`
                  }
                  aria-pressed={addedProducts.includes(product.name)}
                  onClick={() => {
                    setAddedProducts((current) =>
                      current.includes(product.name)
                        ? current
                        : [...current, product.name],
                    );
                    setAddedProduct(product.name);
                  }}
                  className="size-11 shrink-0 rounded-full transition-colors hover:bg-[#07261b] hover:text-white sm:size-8"
                >
                  {addedProducts.includes(product.name) ? (
                    <Check className="size-[18px]" strokeWidth={1.5} />
                  ) : (
                    <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {addedProduct
            ? `${addedProduct} added to your bag. ${addedProducts.length} ${addedProducts.length === 1 ? "item" : "items"} in your bag.`
            : ""}
        </p>
      </div>
    </section>
  );
}
