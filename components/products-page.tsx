"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import type { ShopifyProduct } from "@/lib/shopify";

const sortOptions = [
  { value: "Featured", label: "Recommended" },
  { value: "Price: low to high", label: "Price low to high" },
  { value: "Price: high to low", label: "Price high to low" },
] as const;
type SortOption = (typeof sortOptions)[number]["value"];

function PlaceholderFilterGroup({ title, options, idPrefix }: { title: string; options: string[]; idPrefix: string }) {
  return (
    <details open className="group border-t border-[#d7cebf] py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-[#22231f] marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.5} />
      </summary>
      <fieldset disabled className="mt-5 space-y-4">
        <legend className="sr-only">{title} filters coming soon</legend>
        {options.map((option, index) => {
          const id = `${idPrefix}-${index + 1}`;
          return (
            <label key={id} htmlFor={id} className="flex cursor-not-allowed items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#363832]">
              <input id={id} type="checkbox" className="size-[17px] shrink-0 appearance-none border border-[#353630] bg-transparent disabled:opacity-100" />
              {option}
            </label>
          );
        })}
      </fieldset>
    </details>
  );
}

function getCategory(productType: string) {
  const type = productType.toLowerCase();
  if (type.includes("ring")) return "Rings";
  if (type.includes("necklace")) return "Necklaces";
  if (type.includes("bracelet") || type.includes("cuff")) return "Bracelets";
  if (type.includes("earring")) return "Earrings";
  return productType || "Jewelry";
}

export function ProductsPage({
  products,
  catalogError,
}: {
  products: ShopifyProduct[];
  catalogError: string | null;
}) {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState<SortOption>("Featured");
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (catalogError) {
      toast({
        title: "Collection unavailable",
        description: catalogError,
      });
    }
  }, [catalogError]);

  const categories = useMemo(
    () => ["All pieces", ...new Set(products.map((product) => getCategory(product.productType)))],
    [products],
  );
  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => category === "All pieces" || getCategory(product.productType) === category,
    );
    if (sort === "Price: low to high") {
      return [...filtered].sort(
        (a, b) => Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount),
      );
    }
    if (sort === "Price: high to low") {
      return [...filtered].sort(
        (a, b) => Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount),
      );
    }
    return filtered;
  }, [category, products, sort]);

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#171714]">
      <section aria-labelledby="products-title" className="px-5 pb-8 pt-7 sm:px-[5.5%] sm:pb-10 sm:pt-10">
        <nav aria-label="Breadcrumb" className="font-serif text-[13px] text-[#746d60]">
          <Link className="transition-colors hover:text-[#07261b]" href="/">Home</Link>
          <span className="mx-2 text-[#b99045]">›</span>
          <span>Jewelry</span>
          <span className="mx-2 text-[#b99045]">›</span>
          <span aria-current="page">The Orélia Collection</span>
        </nav>

        <div className="mx-auto mt-10 max-w-[760px] text-center sm:mt-14">
          <p className="orelia-eyebrow text-[#8c7043]">The Orélia collection</p>
          <h1 id="products-title" className="orelia-heading mt-4 text-[clamp(2.5rem,6vw,4.75rem)] text-[#101710]">Fine jewelry, for every expression</h1>
          <p className="mx-auto mt-4 max-w-[480px] font-serif text-[16px] leading-relaxed text-[#5f5a51] sm:text-[18px]">Thoughtful pieces, made to become part of your story.</p>
        </div>
      </section>

      <section aria-label="Browse the Orélia collection" className="px-5 pb-14 sm:px-[5.5%] sm:pb-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-9 lg:grid-cols-[245px_minmax(0,1fr)] xl:gap-14">
            <aside aria-label="Product filters" className="border-b border-[#d7cebf] pb-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <fieldset className="border-t border-[#d7cebf] py-5">
                <legend className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-[#22231f]">Sort by</legend>
                <div className="space-y-4">
                  {sortOptions.map((option, index) => {
                    const id = `products-sort-${index + 1}`;
                    return (
                      <label key={option.value} htmlFor={id} className="flex cursor-pointer items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#292a26]">
                        <input id={id} type="radio" name="products-sort" value={option.value} checked={sort === option.value} onChange={() => setSort(option.value)} className="size-[17px] shrink-0 appearance-none rounded-full border border-[#353630] checked:border-[5px] checked:border-[#07261b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442]" />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <details open className="group border-t border-[#d7cebf] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-[#22231f] marker:content-none [&::-webkit-details-marker]:hidden">
                  Category
                  <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <fieldset className="mt-5 space-y-4">
                  <legend className="sr-only">Filter by category</legend>
                  {categories.map((item, index) => {
                    const id = `products-category-${index + 1}`;
                    return (
                      <label key={item} htmlFor={id} className="flex cursor-pointer items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#363832]">
                        <input id={id} type="radio" name="products-category" value={item} checked={category === item} onChange={() => setCategory(item)} className="size-[17px] shrink-0 appearance-none rounded-full border border-[#353630] checked:border-[5px] checked:border-[#07261b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442]" />
                        {item}
                      </label>
                    );
                  })}
                </fieldset>
              </details>

              <PlaceholderFilterGroup title="Filter by" options={["Available online", "New"]} idPrefix="products-status" />
              <PlaceholderFilterGroup title="Selection for" options={["Her", "Him"]} idPrefix="products-selection" />
              <PlaceholderFilterGroup title="Metal" options={["White gold", "Rose gold", "Yellow gold", "Platinum"]} idPrefix="products-metal" />
              <PlaceholderFilterGroup title="Gemstone" options={["Diamond", "Emerald", "Onyx", "Sapphire"]} idPrefix="products-gemstone" />
              <PlaceholderFilterGroup title="Pavé" options={["With pavé", "Without pavé"]} idPrefix="products-pave" />
            </aside>

            <div>
              <p className="mb-5 font-serif text-[13px] text-[#5f5a51]" aria-live="polite">Showing {visibleProducts.length} pieces</p>

          {catalogError ? null : (
            visibleProducts.length === 0 ? (
            <p className="mt-10 border-y border-[#d7cebf] py-8 text-center font-serif text-[16px] text-[#746d60]">No jewelry is available in the collection yet.</p>
            ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-4 xl:gap-x-7">
              {visibleProducts.map((product) => {
                const isAdded = addedProducts.includes(product.id);
                const price = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: product.priceRange.minVariantPrice.currencyCode,
                  maximumFractionDigits: 2,
                }).format(Number(product.priceRange.minVariantPrice.amount));
                const productImage = (
                  <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                    {product.featuredImage ? (
                      <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} fill sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 23vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none" />
                    ) : <div className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">Image coming soon</div>}
                  </div>
                );

                return (
                  <article key={product.id} data-scroll-reveal-item className="group min-w-0">
                    <Link href={`/products/${product.handle}`} aria-label={`View ${product.title}`}>
                      {productImage}
                    </Link>
                    <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                      <Link href={`/products/${product.handle}`} className="min-w-0">
                        <h2 className="orelia-eyebrow text-[9px] sm:text-[10px]">{product.title}</h2>
                        <p className="mt-1.5 line-clamp-2 font-serif text-[13px] text-[#746d60] sm:text-[15px]">{product.description || getCategory(product.productType)}</p>
                        <p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:mt-3 sm:text-[17px]">{price}</p>
                      </Link>
                      <Button type="button" variant="ghost" size="icon" aria-label={isAdded ? `${product.title} is in your bag` : `Add ${product.title} to your bag`} aria-pressed={isAdded} onClick={() => setAddedProducts((current) => current.includes(product.id) ? current : [...current, product.id])} className="-mr-2 mt-1 size-10 shrink-0 rounded-full text-[#171714] hover:bg-[#07261b] hover:text-white sm:mr-0">
                        {isAdded ? <Check className="size-[18px]" strokeWidth={1.5} /> : <ShoppingBag className="size-[18px]" strokeWidth={1.5} />}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
            )
          )}
          <p className="sr-only" role="status" aria-live="polite">
            {addedProducts.length > 0 ? `${products.find((product) => product.id === addedProducts.at(-1))?.title ?? "Product"} added to your bag.` : ""}
          </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
