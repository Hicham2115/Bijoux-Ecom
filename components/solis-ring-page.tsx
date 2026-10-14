"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, Heart, Minus, Plus, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import type { ShopifyProductDetails } from "@/lib/shopify";
import { toCartItem, toFavoriteItem } from "@/lib/commerce";
import { useCommerceStore } from "@/lib/commerce-store";

const gallery = [
  { label: "Bague Solis, vue de face", className: "bg-[#ece8df]" },
  { label: "Bague Solis, détail", className: "bg-[#e5e0d6]" },
  { label: "Bague Solis portée à la main", className: "bg-[#eee9e1]" },
];

const sizes = ["5", "6", "7", "8", "9"];
const price = new Intl.NumberFormat("fr-MA", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(2450);

export function SolisRingPage({ product }: { product: ShopifyProductDetails | null }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const sizeOption = product?.variants.nodes
    .flatMap((variant) => variant.selectedOptions)
    .find((option) => option.name.toLowerCase().includes("size"))?.name;
  const availableSizes = product?.variants.nodes
    .flatMap((variant) => variant.selectedOptions
      .filter((option) => option.name === sizeOption)
      .map((option) => option.value));
  const sizeOptions = availableSizes?.length ? [...new Set(availableSizes)] : sizes;
  const [selectedSize, setSelectedSize] = useState(() => {
    const firstAvailable = product?.variants.nodes.find((variant) => variant.availableForSale);
    return firstAvailable?.selectedOptions.find((option) => option.name === sizeOption)?.value ?? "7";
  });
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const cartItems = useCommerceStore((state) => state.cartItems);
  const favorites = useCommerceStore((state) => state.favorites);
  const addToCart = useCommerceStore((state) => state.addToCart);
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite);
  const selectedVariant = product?.variants.nodes.find((variant) =>
    variant.availableForSale &&
    (sizeOption
      ? variant.selectedOptions.some((option) => option.name === sizeOption && option.value === selectedSize)
      : true),
  );
  const productId = product?.id ?? "solis-ring";
  const saved = favorites.some((item) => item.productId === productId);
  const added = Boolean(selectedVariant && cartItems.some((item) => item.variantId === selectedVariant.id));
  const formattedPrice = product && selectedVariant
    ? new Intl.NumberFormat("fr-MA", { style: "currency", currency: selectedVariant.price.currencyCode, maximumFractionDigits: 2 }).format(Number(selectedVariant.price.amount))
    : price;
  const favoriteItem = product
    ? toFavoriteItem(product, selectedVariant)
    : { variantId: "", productId, handle: "solis-ring", title: "Bague émeraude Solis", description: "Un peu de lumière, tout près de soi.", productType: "Bagues", image: "/products/solis-ring.webp", price: "2450", currencyCode: "USD", variantTitle: "Default Title" };

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#171714]">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-6 sm:px-[5.5%] sm:pb-24 sm:pt-8">
        <nav aria-label="Fil d’Ariane" className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#746d60] sm:text-[11px]">
          <Link href="/" className="transition-colors hover:text-[#927342]">Accueil</Link>
          <span className="mx-2 text-[#b99045]">/</span>
          <Link href="/products" className="transition-colors hover:text-[#927342]">Bijoux</Link>
          <span className="mx-2 text-[#b99045]">/</span>
          <span>Bagues</span>
          <span className="mx-2 text-[#b99045]">/</span>
          <span aria-current="page">Solis</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.75fr)] lg:gap-[7.5%] xl:mt-10">
          <section aria-label="Images de la bague Solis" className="grid items-start gap-3 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-4">
            <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:gap-3">
              {gallery.map((image, index) => (
                <button key={image.label} type="button" onClick={() => setSelectedImage(index)} aria-label={`Voir : ${image.label}`} aria-pressed={selectedImage === index} className={`relative size-[68px] shrink-0 overflow-hidden border transition-colors sm:size-[76px] ${selectedImage === index ? "border-[#927342]" : "border-transparent hover:border-[#c9c0b1]"}`}>
                  <Image quality={90} src="/products/solis-ring.webp" alt="" fill sizes="76px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className={`relative order-1 aspect-[0.94] min-h-[320px] overflow-hidden sm:order-2 sm:aspect-[0.9] lg:aspect-[0.88] ${gallery[selectedImage].className}`}>
              <Image quality={90} src="/products/solis-ring.webp" alt="Bague Solis en or 18 carats ornée d’une émeraude vert vif" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none" />
              <span className="absolute bottom-4 left-4 bg-[#f5f1e9]/90 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.15em] text-[#39382f] sm:bottom-6 sm:left-6">La joaillerie Orélia</span>
            </div>
          </section>

          <section aria-labelledby="product-title" className="flex flex-col lg:sticky lg:top-8 lg:self-start">
            <p className="orelia-eyebrow text-[#8c7043]">La collection Solis</p>
          <h1 id="product-title" className="orelia-heading mt-3 text-[clamp(2.35rem,4.2vw,4.25rem)] text-[#101710]">Bague émeraude Solis</h1>
            <p className="mt-3 font-serif text-[16px] leading-relaxed text-[#625d53] sm:text-[18px]">Un peu de lumière, tout près de soi.</p>
            <p className="mt-6 font-sans text-[14px] font-medium tracking-[0.04em] text-[#242721] sm:mt-8 sm:text-[15px]">{formattedPrice}</p>
            <p className="mt-1 font-sans text-[11px] text-[#746d60]">Taxes incluses · Livraison offerte</p>

            <div className="mt-7 border-t border-[#d7cebf] pt-6 sm:mt-8">
              <div className="flex items-center justify-between">
                <label className="orelia-eyebrow text-[#4b493f]" htmlFor="ring-size">Taille de bague</label>
                <a href="#ring-size" className="min-h-10 inline-flex items-center font-serif text-[13px] text-[#746d60] underline decoration-[#b9a783] underline-offset-4 hover:text-[#07261b]">Trouver ma taille</a>
              </div>
              <div id="ring-size" className="mt-3 grid grid-cols-5 gap-2" role="group" aria-label="Choisir la taille de bague">
                {sizeOptions.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`min-h-12 border font-serif text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442] ${selectedSize === size ? "border-[#07261b] bg-[#07261b] text-white" : "border-[#c9c0b1] hover:border-[#927342]"}`}>{size}</button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3 sm:mt-8">
              <div className="inline-flex h-14 items-center border border-[#c9c0b1]" aria-label="Quantité">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Diminuer la quantité" className="grid size-11 place-items-center text-[#49463f] hover:text-[#927342]"><Minus className="size-4" /></button>
                <span className="min-w-6 text-center font-sans text-[13px]" aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => Math.min(9, current + 1))} aria-label="Augmenter la quantité" className="grid size-11 place-items-center text-[#49463f] hover:text-[#927342]"><Plus className="size-4" /></button>
              </div>
              <button type="button" disabled={!selectedVariant} onClick={() => selectedVariant && product && addToCart(toCartItem(product, selectedVariant), quantity)} className="orelia-button inline-flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#07261b] px-5 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:bg-[#123b2d] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98442]">
                {added ? <><Check className="size-4" /> Ajouté au panier</> : <><ShoppingBag className="size-4" strokeWidth={1.5} /> Ajouter au panier</>}
              </button>
              <button type="button" onClick={() => toggleFavorite(favoriteItem)} aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"} aria-pressed={saved} className={`grid size-14 shrink-0 place-items-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442] ${saved ? "border-[#927342] text-[#927342]" : "border-[#c9c0b1] hover:border-[#927342] hover:text-[#927342]"}`}><Heart className="size-5" strokeWidth={1.4} fill={saved ? "currentColor" : "none"} /></button>
            </div>
            <p className="sr-only" aria-live="polite">{added ? `La bague émeraude Solis, taille ${selectedSize}, est dans votre panier.` : ""}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#d7cebf] py-4">
              <div className="flex items-center gap-3 font-serif text-[13px] text-[#5f5a51]"><Truck className="size-4 text-[#8c7043]" strokeWidth={1.4} /> Livraison offerte</div>
              <div className="flex items-center gap-3 font-serif text-[13px] text-[#5f5a51]"><RotateCcw className="size-4 text-[#8c7043]" strokeWidth={1.4} /> Retours sous 30 jours</div>
            </div>

            <div className="border-b border-[#d7cebf]">
              <button type="button" onClick={() => setDetailsOpen((current) => !current)} aria-expanded={detailsOpen} className="flex min-h-[62px] w-full items-center justify-between text-left">
                <span className="orelia-eyebrow text-[#4b493f]">Détails et entretien</span>
                <ChevronDown className={`size-4 text-[#8c7043] transition-transform ${detailsOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {detailsOpen && <div className="space-y-3 pb-5 font-serif text-[14px] leading-relaxed text-[#625d53]"><p>Façonnée en or jaune 18 carats recyclé et sertie d’une émeraude éclatante, choisie pour la profondeur de sa couleur et son caractère naturel.</p><p>Chaque création Orélia est réalisée avec soin. Évitez le contact avec le parfum et les cosmétiques ; nettoyez délicatement avec un chiffon doux.</p></div>}
            </div>

            <p className="mt-5 font-serif text-[14px] leading-relaxed text-[#746d60]">Façonné avec patience. Porté toute une vie. Chaque création Orélia est présentée dans notre écrin signature.</p>
          </section>
        </div>

        <section aria-labelledby="related-products-title" className="mt-16 border-t border-[#d7cebf] pt-10 sm:mt-24 sm:pt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="orelia-eyebrow text-[#8c7043]">Choisi pour vous</p>
              <h2 id="related-products-title" className="orelia-heading mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[#101710]">Vous aimerez peut-être aussi</h2>
            </div>
            <Link href="/products" className="hidden min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:inline-flex">Voir tous les bijoux <span aria-hidden="true" className="ml-3 text-base">↗</span></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-9 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-7">
            {[
              { name: "Atlas Chain", handle: "atlas-chain", detail: "Or 18 carats", price: "3 800 $US", image: "/products/atlas-chain.webp" },
              { name: "Éclat Ring", handle: "eclat-ring", detail: "Or 18 carats · diamants", price: "3 600 $US", image: "/products/eclat-ring.webp" },
              { name: "Forma Cuff", handle: "forma-cuff", detail: "Or 18 carats", price: "4 200 $US", image: "/products/forma-cuff.webp" },
            ].map((product) => (
              <Link key={product.name} href={`/products/${product.handle}`} className="group block min-w-0">
                <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                  <Image quality={90} src={product.image} alt={product.name} fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 28vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                  <div>
                    <h3 className="orelia-eyebrow text-[9px] sm:text-[10px]">{product.name}</h3>
                    <p className="mt-1.5 font-serif text-[13px] text-[#746d60] sm:text-[15px]">{product.detail}</p>
                    <p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:mt-3 sm:text-[17px]">{product.price}</p>
                  </div>
                  <span aria-hidden="true" className="mt-1 inline-flex size-10 shrink-0 items-center justify-center font-serif text-lg text-[#8c7043] transition-transform group-hover:translate-x-1">↗</span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/products" className="mt-6 inline-flex min-h-11 items-center border-b border-[#927342] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#07261b] transition-colors hover:text-[#927342] sm:hidden">Voir tous les bijoux <span aria-hidden="true" className="ml-3 text-base">↗</span></Link>
        </section>
      </div>
    </main>
  );
}
