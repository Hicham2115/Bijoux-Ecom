"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, Heart, Minus, Plus, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import type { ShopifyProduct, ShopifyProductDetails } from "@/lib/shopify";

const ringSizes = ["5", "6", "7", "8", "9"];

export function ShopifyProductPage({
  product,
  relatedProducts,
}: {
  product: ShopifyProductDetails;
  relatedProducts: ShopifyProduct[];
}) {
  const images = product.images.nodes.length > 0
    ? product.images.nodes
    : product.featuredImage ? [product.featuredImage] : [];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("7");
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isRing = product.productType.toLowerCase().includes("ring");
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(product.priceRange.minVariantPrice.amount));

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#171714]">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-6 sm:px-[5.5%] sm:pb-24 sm:pt-8">
        <nav aria-label="Breadcrumb" className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#746d60] sm:text-[11px]">
          <Link href="/" className="transition-colors hover:text-[#927342]">Home</Link>
          <span className="mx-2 text-[#b99045]">/</span>
          <Link href="/products" className="transition-colors hover:text-[#927342]">Jewelry</Link>
          <span className="mx-2 text-[#b99045]">/</span>
          <span aria-current="page">{product.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.75fr)] lg:gap-[7.5%] xl:mt-10">
          <section aria-label={`${product.title} product images`} className="grid items-start gap-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-4">
            <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:gap-3">
              {images.map((image, index) => (
                <button key={`${image.url}-${index}`} type="button" onClick={() => setSelectedImage(index)} aria-label={`View ${product.title}, image ${index + 1}`} aria-pressed={selectedImage === index} className={`relative size-[68px] shrink-0 overflow-hidden border transition-colors sm:size-[76px] ${selectedImage === index ? "border-[#927342]" : "border-transparent hover:border-[#c9c0b1]"}`}>
                  <Image src={image.url} alt="" fill sizes="76px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative order-1 aspect-[0.94] min-h-[320px] overflow-hidden bg-[#ece8df] sm:order-2 sm:aspect-[0.9] lg:aspect-[0.88]">
              {images[selectedImage] ? (
                <Image src={images[selectedImage].url} alt={images[selectedImage].altText || product.title} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none" />
              ) : <div className="grid size-full place-items-center font-serif text-[15px] text-[#8c8579]">Image coming soon</div>}
              <span className="absolute bottom-4 left-4 bg-[#f5f1e9]/90 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.15em] text-[#39382f] sm:bottom-6 sm:left-6">Orélia fine jewelry</span>
            </div>
          </section>

          <section aria-labelledby="product-title" className="flex flex-col lg:sticky lg:top-8 lg:self-start">
            <p className="orelia-eyebrow text-[#8c7043]">The {product.productType || "Orélia"} collection</p>
            <h1 id="product-title" className="orelia-heading mt-3 text-[clamp(2.35rem,4.2vw,4.25rem)] text-[#101710]">{product.title}</h1>
            {product.description && <p className="mt-3 font-serif text-[16px] leading-relaxed text-[#625d53] sm:text-[18px]">{product.description}</p>}
            <p className="mt-6 font-sans text-[14px] font-medium tracking-[0.04em] text-[#242721] sm:mt-8 sm:text-[15px]">{price}</p>
            <p className="mt-1 font-sans text-[11px] text-[#746d60]">{product.availableForSale ? "Taxes included · Complimentary delivery" : "Currently unavailable"}</p>

            {isRing && <div className="mt-7 border-t border-[#d7cebf] pt-6 sm:mt-8">
              <div className="flex items-center justify-between">
                <span className="orelia-eyebrow text-[#4b493f]">Ring size</span>
                <a href="#size-guide" className="inline-flex min-h-10 items-center font-serif text-[13px] text-[#746d60] underline decoration-[#b9a783] underline-offset-4 hover:text-[#07261b]">Find your size</a>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2" role="group" aria-label="Choose ring size">
                {ringSizes.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`min-h-12 border font-serif text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442] ${selectedSize === size ? "border-[#07261b] bg-[#07261b] text-white" : "border-[#c9c0b1] hover:border-[#927342]"}`}>{size}</button>
                ))}
              </div>
            </div>}

            <div className="mt-7 flex items-center gap-3 sm:mt-8">
              <div className="inline-flex h-14 items-center border border-[#c9c0b1]" aria-label="Quantity">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity" className="grid size-11 place-items-center text-[#49463f] hover:text-[#927342]"><Minus className="size-4" /></button>
                <span className="min-w-6 text-center font-sans text-[13px]" aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => Math.min(9, current + 1))} aria-label="Increase quantity" className="grid size-11 place-items-center text-[#49463f] hover:text-[#927342]"><Plus className="size-4" /></button>
              </div>
              <button type="button" disabled={!product.availableForSale} onClick={() => setAdded(true)} className="orelia-button inline-flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#07261b] px-5 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:bg-[#123b2d] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98442]">
                {added ? <><Check className="size-4" /> Added to bag</> : <><ShoppingBag className="size-4" strokeWidth={1.5} /> Add to bag</>}
              </button>
              <button type="button" onClick={() => setSaved((current) => !current)} aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={saved} className={`grid size-14 shrink-0 place-items-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442] ${saved ? "border-[#927342] text-[#927342]" : "border-[#c9c0b1] hover:border-[#927342] hover:text-[#927342]"}`}><Heart className="size-5" strokeWidth={1.4} fill={saved ? "currentColor" : "none"} /></button>
            </div>
            <p className="sr-only" aria-live="polite">{added ? `${quantity} ${product.title}${isRing ? `, size ${selectedSize},` : ","} added to your bag.` : ""}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#d7cebf] py-4">
              <div className="flex items-center gap-3 font-serif text-[13px] text-[#5f5a51]"><Truck className="size-4 text-[#8c7043]" strokeWidth={1.4} /> Complimentary delivery</div>
              <div className="flex items-center gap-3 font-serif text-[13px] text-[#5f5a51]"><RotateCcw className="size-4 text-[#8c7043]" strokeWidth={1.4} /> 30-day returns</div>
            </div>

            <div className="border-b border-[#d7cebf]">
              <button type="button" onClick={() => setDetailsOpen((current) => !current)} aria-expanded={detailsOpen} className="flex min-h-[62px] w-full items-center justify-between text-left">
                <span className="orelia-eyebrow text-[#4b493f]">Details & care</span>
                <ChevronDown className={`size-4 text-[#8c7043] transition-transform ${detailsOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {detailsOpen && <div className="space-y-3 pb-5 font-serif text-[14px] leading-relaxed text-[#625d53]"><p>{product.description || `${product.title}, thoughtfully designed and finished by hand.`}</p><p>Keep away from perfume and cosmetics; clean gently with a soft cloth.</p></div>}
            </div>
            <p className="mt-5 font-serif text-[14px] leading-relaxed text-[#746d60]">Made slowly. Worn for a lifetime. Every Orélia piece arrives in our signature keepsake box.</p>
          </section>
        </div>

        {relatedProducts.length > 0 && <section aria-labelledby="related-products-title" className="mt-16 border-t border-[#d7cebf] pt-10 sm:mt-24 sm:pt-14">
          <div className="flex items-end justify-between gap-4">
            <div><p className="orelia-eyebrow text-[#8c7043]">Chosen for you</p><h2 id="related-products-title" className="orelia-heading mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[#101710]">You may also love</h2></div>
            <Link href="/products" className="hidden min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:inline-flex">View all jewelry <span aria-hidden="true" className="ml-3 text-base">↗</span></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-9 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-7">
            {relatedProducts.map((related) => <Link key={related.id} href={`/products/${related.handle}`} className="group block min-w-0">
              <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                {related.featuredImage ? <Image src={related.featuredImage.url} alt={related.featuredImage.altText || related.title} fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 28vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none" /> : <div className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">Image coming soon</div>}
              </div>
              <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4"><div><h3 className="orelia-eyebrow text-[9px] sm:text-[10px]">{related.title}</h3><p className="mt-1.5 font-serif text-[13px] text-[#746d60] sm:text-[15px]">{related.productType || "Fine jewelry"}</p><p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:mt-3 sm:text-[17px]">{new Intl.NumberFormat("en-US", { style: "currency", currency: related.priceRange.minVariantPrice.currencyCode, maximumFractionDigits: 2 }).format(Number(related.priceRange.minVariantPrice.amount))}</p></div><span aria-hidden="true" className="mt-1 inline-flex size-10 shrink-0 items-center justify-center font-serif text-lg text-[#8c7043] transition-transform group-hover:translate-x-1">↗</span></div>
            </Link>)}
          </div>
          <Link href="/products" className="mt-6 inline-flex min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:hidden">View all jewelry <span aria-hidden="true" className="ml-3 text-base">↗</span></Link>
        </section>}
      </div>
    </main>
  );
}
