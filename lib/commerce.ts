import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify";
import type { CartItem, FavoriteItem } from "@/lib/commerce-store";

export function getDefaultVariant(product: ShopifyProduct) {
  return product.variants.nodes.find((variant) => variant.availableForSale)
    ?? product.variants.nodes[0];
}

export function getSelectedVariant(
  product: ShopifyProduct,
  selectedOptions: Record<string, string>,
) {
  return product.variants.nodes.find(
    (variant) =>
      variant.availableForSale &&
      variant.selectedOptions.every(
        ({ name, value }) =>
          value === "Default Title" || selectedOptions[name] === value,
      ),
  );
}

export function toFavoriteItem(
  product: ShopifyProduct,
  variant?: ShopifyVariant,
): FavoriteItem {
  return {
    variantId: variant?.id ?? getDefaultVariant(product)?.id ?? "",
    productId: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    productType: product.productType,
    image: product.featuredImage?.url ?? "",
    price: variant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    currencyCode:
      variant?.price.currencyCode ??
      product.priceRange.minVariantPrice.currencyCode,
    variantTitle: variant?.title ?? "Default Title",
  };
}

export function toCartItem(
  product: ShopifyProduct,
  variant: ShopifyVariant,
): Omit<CartItem, "quantity"> {
  return {
    variantId: variant.id,
    productId: product.id,
    handle: product.handle,
    title: product.title,
    image: product.featuredImage?.url ?? "",
    price: variant.price.amount,
    currencyCode: variant.price.currencyCode,
    variantTitle: variant.title,
  };
}
