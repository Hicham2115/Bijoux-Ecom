"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import type { ShopifyProduct } from "@/lib/shopify";

export function FeaturedJewelrySection({ products, catalogError }: { products: ShopifyProduct[]; catalogError: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (catalogError) {
      toast({
        title: "Collection unavailable",
        description: "We couldn’t load the collection. Please try again later.",
      });
    }
  }, [catalogError]);

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

        {products.length > 0 ? <div
          ref={carouselRef}
          className="featured-jewelry-carousel flex gap-4 overflow-x-auto pb-3 sm:gap-5"
          aria-label="Featured jewelry products"
        >
          {products.map((product) => (
            <article
              key={product.id}
              data-scroll-reveal-item
              className="category-card featured-jewelry-card min-w-0"
            >
              <Link href={`/products/${product.handle}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                  {product.featuredImage ? (
                    <Image quality={90}
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 30vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none"
                    />
                  ) : <div className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">Image coming soon</div>}
                </div>
                <h3 className="orelia-eyebrow mt-3 sm:mt-4">{product.title}</h3>
              </Link>
              <Link href={`/products/${product.handle}`} className="mt-1 block font-serif text-[13px] leading-[1.5] text-[#5f5a51] hover:text-[#927342] sm:text-[14px]">
                {product.description || product.productType || "Fine jewelry"}
              </Link>
              <div className="mt-2 flex items-center justify-between gap-2 sm:mt-3">
                <Link href={`/products/${product.handle}`} className="text-[14px] font-semibold hover:text-[#927342] sm:text-[16px]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: product.priceRange.minVariantPrice.currencyCode,
                    maximumFractionDigits: 2,
                  }).format(Number(product.priceRange.minVariantPrice.amount))}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    addedProducts.includes(product.id)
                      ? `${product.title} is in your bag`
                      : `Add ${product.title} to your bag`
                  }
                  aria-pressed={addedProducts.includes(product.id)}
                  onClick={() => {
                    setAddedProducts((current) =>
                      current.includes(product.id)
                        ? current
                        : [...current, product.id],
                    );
                    setAddedProduct(product.id);
                  }}
                  className="size-11 shrink-0 rounded-full transition-colors hover:bg-[#07261b] hover:text-white sm:size-8"
                >
                  {addedProducts.includes(product.id) ? (
                    <Check className="size-[18px]" strokeWidth={1.5} />
                  ) : (
                    <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div> : catalogError ? null : <p className="py-10 text-center font-serif text-[16px] text-[#746d60]">Our collection is being prepared.</p>}
        <p className="sr-only" role="status" aria-live="polite">
          {addedProduct
            ? `${products.find((product) => product.id === addedProduct)?.title ?? "Product"} added to your bag. ${addedProducts.length} ${addedProducts.length === 1 ? "item" : "items"} in your bag.`
            : ""}
        </p>
        <div className="mt-5 flex justify-end">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:text-[11px]"
          >
            View all pieces <span aria-hidden="true" className="ml-3 text-base">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
