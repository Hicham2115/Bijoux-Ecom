"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { getDefaultVariant, toCartItem, toFavoriteItem } from "@/lib/commerce";
import { useCommerceStore } from "@/lib/commerce-store";
import type { ShopifyProduct } from "@/lib/shopify";

export function FeaturedJewelrySection({ products, catalogError }: { products: ShopifyProduct[]; catalogError: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const cartItems = useCommerceStore((state) => state.cartItems);
  const favorites = useCommerceStore((state) => state.favorites);
  const addToCart = useCommerceStore((state) => state.addToCart);
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite);

  useEffect(() => {
    if (catalogError) {
      toast({
        title: "Collection indisponible",
        description: "Nous n’avons pas pu charger la collection. Veuillez réessayer plus tard.",
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
              Nos bijoux à découvrir
            </h2>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir les bijoux précédents"
              onClick={() => scrollProducts(-1)}
              className="size-11 rounded-full border-[#c9c3b8] bg-transparent transition-colors hover:border-[#8b7042] hover:bg-[#07261b] hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Voir plus de bijoux"
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
          aria-label="Sélection de bijoux"
        >
          {products.map((product) => {
            const variant = getDefaultVariant(product);
            const isAdded = cartItems.some((item) => item.variantId === variant?.id);
            const isFavorite = favorites.some((item) => item.productId === product.id);

            return (
            <article
              key={product.id}
              data-scroll-reveal-item
              className="category-card featured-jewelry-card min-w-0"
            >
              <div className="relative">
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
                    ) : <div className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">Image bientôt disponible</div>}
                  </div>
                <h3 className="orelia-eyebrow mt-3 sm:mt-4">{product.title}</h3>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleFavorite(toFavoriteItem(product, variant))}
                  aria-label={isFavorite ? `Retirer ${product.title} des favoris` : `Ajouter ${product.title} aux favoris`}
                  aria-pressed={isFavorite}
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-[#d7cebf] bg-[#f7f3eb]/95 text-[#363a32] shadow-sm transition-colors hover:text-[#8a3e32]"
                >
                  <Heart className="size-[18px]" fill={isFavorite ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>
              <Link href={`/products/${product.handle}`} className="mt-1 block font-serif text-[13px] leading-[1.5] text-[#5f5a51] hover:text-[#927342] sm:text-[14px]">
                {product.description || product.productType || "Joaillerie"}
              </Link>
              <div className="mt-2 flex items-center justify-between gap-2 sm:mt-3">
                <Link href={`/products/${product.handle}`} className="text-[14px] font-semibold hover:text-[#927342] sm:text-[16px]">
                  {new Intl.NumberFormat("fr-MA", {
                    style: "currency",
                    currency: product.priceRange.minVariantPrice.currencyCode,
                    maximumFractionDigits: 2,
                  }).format(Number(product.priceRange.minVariantPrice.amount))}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    isAdded
                      ? `${product.title} est dans votre panier`
                      : `Ajouter ${product.title} au panier`
                  }
                  aria-pressed={isAdded}
                  disabled={!variant}
                  onClick={() => {
                    if (!variant) return;
                    addToCart(toCartItem(product, variant));
                    setAddedProduct(product.id);
                  }}
                  className="size-11 shrink-0 rounded-full transition-colors hover:bg-[#07261b] hover:text-white disabled:opacity-40 sm:size-8"
                >
                  {isAdded ? (
                    <Check className="size-[18px]" strokeWidth={1.5} />
                  ) : (
                    <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
                  )}
                </Button>
              </div>
            </article>
            );
          })}
        </div> : catalogError ? null : <p className="py-10 text-center font-serif text-[16px] text-[#746d60]">Notre collection se prépare.</p>}
        <p className="sr-only" role="status" aria-live="polite">
          {addedProduct
            ? `${products.find((product) => product.id === addedProduct)?.title ?? "Article"} ajouté à votre panier.`
            : ""}
        </p>
        <div className="mt-5 flex justify-end">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:text-[11px]"
          >
            Voir tous les bijoux <span aria-hidden="true" className="ml-3 text-base">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
