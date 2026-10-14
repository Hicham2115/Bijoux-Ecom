"use client";

import { useEffect } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCommerceStore } from "@/lib/commerce-store";

export function CommerceShell() {
  useEffect(() => {
    void useCommerceStore.persist.rehydrate();
  }, []);

  return <CartDrawer />;
}
