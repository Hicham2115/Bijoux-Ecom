"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
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

function PlaceholderFilterGroup({
  title,
  options,
  idPrefix,
}: {
  title: string;
  options: string[];
  idPrefix: string;
}) {
  return (
    <details open className="group border-t border-[#d7cebf] py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-[#22231f] marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-open:rotate-180"
          strokeWidth={1.5}
        />
      </summary>
      <fieldset disabled className="mt-5 space-y-4">
        <legend className="sr-only">{title} filters coming soon</legend>
        {options.map((option, index) => {
          const id = `${idPrefix}-${index + 1}`;
          return (
            <label
              key={id}
              htmlFor={id}
              className="flex cursor-not-allowed items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#363832]"
            >
              <input
                id={id}
                type="checkbox"
                className="size-[17px] shrink-0 appearance-none border border-[#353630] bg-transparent disabled:opacity-100"
              />
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (catalogError) {
      toast({
        title: "Collection unavailable",
        description: catalogError,
      });
    }
  }, [catalogError]);

  const categories = useMemo(
    () => [
      "All pieces",
      ...new Set(products.map((product) => getCategory(product.productType))),
    ],
    [products],
  );
  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        category === "All pieces" ||
        getCategory(product.productType) === category,
    );
    if (sort === "Price: low to high") {
      return [...filtered].sort(
        (a, b) =>
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount),
      );
    }
    if (sort === "Price: high to low") {
      return [...filtered].sort(
        (a, b) =>
          Number(b.priceRange.minVariantPrice.amount) -
          Number(a.priceRange.minVariantPrice.amount),
      );
    }
    return filtered;
  }, [category, products, sort]);

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#171714]">
      <section
        aria-labelledby="products-title"
        className="bg-[#f5f1e9] px-5 pb-8 pt-0 sm:px-[5.5%] sm:pb-10 sm:pt-0"
      >
        <nav
          aria-label="Breadcrumb"
          className="-mx-5 mb-0 border-b border-[#e4ddcf] bg-[#f5f1e9] px-5 py-2.5 font-serif text-[13px] text-[#746d60] sm:-mx-[5.5vw] sm:px-[5.5vw] sm:py-3"
        >
          <Link className="transition-colors hover:text-[#07261b]" href="/">
            Home
          </Link>
          <span className="mx-2 text-[#b99045]">›</span>
          <Link className="transition-colors hover:text-[#07261b]" href="/products">
            Jewelry
          </Link>
          <span className="mx-2 text-[#b99045]">›</span>
          <Link className="transition-colors hover:text-[#07261b]" href="/products" aria-current="page">
            The Orélia Collection
          </Link>
        </nav>

        <div className="collection-hero -mx-5 grid w-auto grid-cols-[44%_56%] overflow-hidden bg-[#eee7dc] sm:-mx-[5.5vw] lg:min-h-[450px] lg:grid-cols-2">
          <div className="relative min-h-[250px] overflow-hidden sm:min-h-[380px] lg:min-h-[450px]">
            <Image
              src="/orelia-collection-model-covered.png"
              alt="Orélia model wearing gold and emerald jewelry"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[18%_center]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#07261b]/20 via-transparent to-transparent"
            />
            <span className="absolute bottom-2 left-2 font-sans text-[6px] font-medium uppercase tracking-[0.12em] text-white drop-shadow sm:bottom-7 sm:left-7 sm:text-[9px] sm:tracking-[0.16em]">
              Orélia fine jewelry
            </span>
          </div>
          <div className="flex min-h-[250px] flex-col items-center justify-center px-2 py-5 text-center sm:px-8 sm:py-12 lg:min-h-[450px] lg:px-[12%] lg:py-16">
            <p className="orelia-eyebrow text-[7px] text-[#8c7043] sm:text-[10px]">
              The Orélia collection
            </p>
            <h1
              id="products-title"
              className="orelia-heading mt-2 max-w-[620px] text-[clamp(1.05rem,4.5vw,4.25rem)] leading-[1.04] text-[#101710] sm:mt-4 sm:text-[clamp(2rem,4vw,4.25rem)]"
            >
              Fine jewelry, for every expression
            </h1>
            <p className="mx-auto mt-2 max-w-[430px] font-serif text-[9px] leading-snug text-[#5f5a51] sm:mt-5 sm:text-[16px] lg:text-[18px]">
              Thoughtful pieces, made to become part of your story.
            </p>
            <span aria-hidden="true" className="mt-3 h-px w-8 bg-[#b99045] sm:mt-6 sm:w-14 lg:mt-8" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[38%] z-[2] hidden w-[24%] bg-gradient-to-r from-transparent via-[#eee7dc]/75 to-[#eee7dc] lg:block"
          />
        </div>
      </section>

      <section
        aria-label="Browse the Orélia collection"
        className="px-5 pb-14 sm:px-[5.5%] sm:pb-20"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-9 xl:gap-14">
            <div className="lg:hidden">
              <Button
                type="button"
                variant="outline"
                aria-expanded={filtersOpen}
                aria-controls="product-filters"
                onClick={() => setFiltersOpen(true)}
                className="w-full justify-between border-[#cfc3ad] bg-transparent px-4 py-3 font-sans text-[11px] uppercase tracking-[0.13em] text-[#252720] hover:bg-[#eee9df]"
              >
                Filter & sort
                <SlidersHorizontal aria-hidden="true" className="size-4 text-[#8c7043]" strokeWidth={1.5} />
              </Button>
            </div>
            {filtersOpen && (
              <button
                type="button"
                aria-label="Close product filters"
                onClick={() => setFiltersOpen(false)}
                className="fixed inset-0 z-[60] bg-[#171714]/45 backdrop-blur-[2px] lg:hidden"
              />
            )}
            <aside
              id="product-filters"
              aria-label="Product filters"
              role={filtersOpen ? "dialog" : undefined}
              aria-modal={filtersOpen || undefined}
              className={`${filtersOpen ? "filter-drawer-down fixed inset-x-0 top-0 z-[61] block max-h-[88dvh] w-full overflow-y-auto rounded-b-2xl bg-[#f5f1e9] px-5 pt-5 shadow-2xl" : "hidden"} border-b border-[#d7cebf] pb-7 lg:relative lg:inset-auto lg:z-auto lg:block lg:w-auto lg:overflow-visible lg:rounded-none lg:border-b-0 lg:border-r lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:shadow-none lg:pr-8`}
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#d7cebf] pb-4 lg:hidden">
                <h2 className="orelia-eyebrow text-[#252720]">Filter & sort</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close product filters"
                  onClick={() => setFiltersOpen(false)}
                  className="size-10 text-[#252720] hover:bg-[#eee9df]"
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </Button>
              </div>
              <fieldset className="border-t border-[#d7cebf] py-5">
                <legend className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-[#22231f]">
                  Sort by
                </legend>
                <div className="space-y-4">
                  {sortOptions.map((option, index) => {
                    const id = `products-sort-${index + 1}`;
                    return (
                      <label
                        key={option.value}
                        htmlFor={id}
                        className="flex cursor-pointer items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#292a26]"
                      >
                        <input
                          id={id}
                          type="radio"
                          name="products-sort"
                          value={option.value}
                          checked={sort === option.value}
                          onChange={() => setSort(option.value)}
                          className="size-[17px] shrink-0 appearance-none rounded-full border border-[#353630] checked:border-[5px] checked:border-[#07261b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442]"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <details open className="group border-t border-[#d7cebf] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-[#22231f] marker:content-none [&::-webkit-details-marker]:hidden">
                  Category
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={1.5}
                  />
                </summary>
                <fieldset className="mt-5 space-y-4">
                  <legend className="sr-only">Filter by category</legend>
                  {categories.map((item, index) => {
                    const id = `products-category-${index + 1}`;
                    return (
                      <label
                        key={item}
                        htmlFor={id}
                        className="flex cursor-pointer items-center gap-4 font-sans text-[13px] uppercase tracking-[0.08em] text-[#363832]"
                      >
                        <input
                          id={id}
                          type="radio"
                          name="products-category"
                          value={item}
                          checked={category === item}
                          onChange={() => setCategory(item)}
                          className="size-[17px] shrink-0 appearance-none rounded-full border border-[#353630] checked:border-[5px] checked:border-[#07261b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442]"
                        />
                        {item}
                      </label>
                    );
                  })}
                </fieldset>
              </details>

              <PlaceholderFilterGroup
                title="Filter by"
                options={["Available online", "New"]}
                idPrefix="products-status"
              />
              <PlaceholderFilterGroup
                title="Selection for"
                options={["Her", "Him"]}
                idPrefix="products-selection"
              />
              <PlaceholderFilterGroup
                title="Metal"
                options={["White gold", "Rose gold", "Yellow gold", "Platinum"]}
                idPrefix="products-metal"
              />
              <PlaceholderFilterGroup
                title="Gemstone"
                options={["Diamond", "Emerald", "Onyx", "Sapphire"]}
                idPrefix="products-gemstone"
              />
              <PlaceholderFilterGroup
                title="Pavé"
                options={["With pavé", "Without pavé"]}
                idPrefix="products-pave"
              />
            </aside>

            <div>
              <p
                className="mb-5 font-serif text-[13px] text-[#5f5a51]"
                aria-live="polite"
              >
                Showing {visibleProducts.length} pieces
              </p>

              {catalogError ? null : visibleProducts.length === 0 ? (
                <p className="mt-10 border-y border-[#d7cebf] py-8 text-center font-serif text-[16px] text-[#746d60]">
                  No jewelry is available in the collection yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-4 xl:gap-x-7">
                  {visibleProducts.map((product) => {
                    const isAdded = addedProducts.includes(product.id);
                    const price = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: product.priceRange.minVariantPrice.currencyCode,
                      maximumFractionDigits: 2,
                    }).format(
                      Number(product.priceRange.minVariantPrice.amount),
                    );
                    const productImage = (
                      <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                        {product.featuredImage ? (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 23vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none"
                          />
                        ) : (
                          <div className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">
                            Image coming soon
                          </div>
                        )}
                      </div>
                    );

                    return (
                      <article
                        key={product.id}
                        data-scroll-reveal-item
                        className="group min-w-0"
                      >
                        <Link
                          href={`/products/${product.handle}`}
                          aria-label={`View ${product.title}`}
                        >
                          {productImage}
                        </Link>
                        <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                          <Link
                            href={`/products/${product.handle}`}
                            className="min-w-0"
                          >
                            <h2 className="orelia-eyebrow text-[9px] sm:text-[10px]">
                              {product.title}
                            </h2>
                            <p className="mt-1.5 line-clamp-2 font-serif text-[13px] text-[#746d60] sm:text-[15px]">
                              {product.description ||
                                getCategory(product.productType)}
                            </p>
                            <p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:mt-3 sm:text-[17px]">
                              {price}
                            </p>
                          </Link>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={
                              isAdded
                                ? `${product.title} is in your bag`
                                : `Add ${product.title} to your bag`
                            }
                            aria-pressed={isAdded}
                            onClick={() =>
                              setAddedProducts((current) =>
                                current.includes(product.id)
                                  ? current
                                  : [...current, product.id],
                              )
                            }
                            className="-mr-2 mt-1 size-10 shrink-0 rounded-full text-[#171714] hover:bg-[#07261b] hover:text-white sm:mr-0"
                          >
                            {isAdded ? (
                              <Check
                                className="size-[18px]"
                                strokeWidth={1.5}
                              />
                            ) : (
                              <ShoppingBag
                                className="size-[18px]"
                                strokeWidth={1.5}
                              />
                            )}
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
              <p className="sr-only" role="status" aria-live="polite">
                {addedProducts.length > 0
                  ? `${products.find((product) => product.id === addedProducts.at(-1))?.title ?? "Product"} added to your bag.`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
