import { z } from "zod";
import { createShopifyCheckout } from "@/lib/shopify";

const checkoutSchema = z.object({
  lines: z
    .array(
      z.object({
        merchandiseId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/[\w-]+$/),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(100),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Les informations du panier sont invalides." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Les informations du panier sont invalides." }, { status: 400 });
  }

  try {
    const checkoutUrl = await createShopifyCheckout(parsed.data.lines);
    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error("Unable to create Shopify checkout", error);
    return Response.json(
      { error: "Impossible de lancer le paiement. Veuillez réessayer." },
      { status: 502 },
    );
  }
}
