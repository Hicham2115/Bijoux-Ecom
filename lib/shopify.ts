export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

export type ShopifyProductDetails = ShopifyProduct & {
  images: { nodes: { url: string; altText: string | null }[] };
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function shopifyQuery<T>(query: string, variables?: Record<string, string>) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;

  if (!storeDomain || !token || !version) {
    throw new Error("Shopify connection settings are missing.");
  }
  if (!/^\d{4}-\d{2}$/.test(version)) {
    throw new Error("The Shopify API version is invalid.");
  }

  let storeUrl: URL;
  try {
    storeUrl = new URL(storeDomain.startsWith("http") ? storeDomain : `https://${storeDomain}`);
  } catch {
    throw new Error("The Shopify store domain is invalid.");
  }

  if (!storeUrl.hostname.endsWith(".myshopify.com")) {
    throw new Error("The Shopify store domain must be a myshopify.com domain.");
  }

  const response = await fetch(`https://${storeUrl.host}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Shopify returned status ${response.status}.`);
  }

  const result = (await response.json()) as ShopifyResponse<T>;
  if (result.errors?.length) {
    throw new Error("Shopify could not complete the product request.");
  }

  if (!result.data) {
    throw new Error("Shopify returned no product data.");
  }

  return result.data;
}

export async function getShopifyProducts() {
  const data = await shopifyQuery<{ products: { nodes: ShopifyProduct[] } }>(
    `query OreliaProducts {
      products(first: 100, sortKey: TITLE) {
        nodes {
          id
          handle
          title
          description
          productType
          availableForSale
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }`,
  );

  return data.products.nodes;
}

export async function getShopifyProduct(handle: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(handle)) return null;

  const data = await shopifyQuery<{ product: ShopifyProductDetails | null }>(
    `query OreliaProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        productType
        availableForSale
        featuredImage { url altText }
        images(first: 8) { nodes { url altText } }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }`,
    { handle },
  );

  return data.product;
}
