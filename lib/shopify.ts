export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
};

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
  variants: { nodes: ShopifyVariant[] };
};

export type ShopifyProductDetails = ShopifyProduct & {
  images: { nodes: { url: string; altText: string | null }[] };
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function shopifyQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
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
    storeUrl = new URL(
      storeDomain.startsWith("http") ? storeDomain : `https://${storeDomain}`,
    );
  } catch {
    throw new Error("The Shopify store domain is invalid.");
  }

  if (!storeUrl.hostname.endsWith(".myshopify.com")) {
    throw new Error("The Shopify store domain must be a myshopify.com domain.");
  }

  const response = await fetch(
    `https://${storeUrl.host}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

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

export async function createShopifyCheckout(
  lines: { merchandiseId: string; quantity: number }[],
) {
  const data = await shopifyQuery<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation OreliaCartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines },
  );

  const result = data.cartCreate;
  if (result.userErrors.length || !result.cart?.checkoutUrl) {
    throw new Error("Shopify could not create a checkout for this cart.");
  }

  const checkoutUrl = new URL(result.cart.checkoutUrl);
  if (checkoutUrl.protocol !== "https:") {
    throw new Error("Shopify returned an invalid checkout URL.");
  }

  return checkoutUrl.toString();
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
          variants(first: 100) {
            nodes {
              id
              title
              availableForSale
              selectedOptions { name value }
              price { amount currencyCode }
            }
          }
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
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
          }
        }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }`,
    { handle },
  );

  return data.product;
}
