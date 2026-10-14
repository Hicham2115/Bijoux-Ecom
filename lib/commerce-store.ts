"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  image: string;
  price: string;
  currencyCode: string;
  variantTitle: string;
  quantity: number;
};

export type FavoriteItem = Omit<CartItem, "quantity"> & {
  description: string;
  productType: string;
};

type CommerceStore = {
  cartItems: CartItem[];
  favorites: FavoriteItem[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setCartQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCommerceStore = create<CommerceStore>()(
  persist(
    (set) => ({
      cartItems: [],
      favorites: [],
      cartOpen: false,
      addToCart: (item, quantity = 1) =>
        set((state) => {
          const existing = state.cartItems.find(
            (cartItem) => cartItem.variantId === item.variantId,
          );
          if (existing) {
            return {
              cartOpen: true,
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.variantId === item.variantId
                  ? {
                      ...cartItem,
                      quantity: Math.min(99, cartItem.quantity + quantity),
                    }
                  : cartItem,
              ),
            };
          }
          return {
            cartOpen: true,
            cartItems: [...state.cartItems, { ...item, quantity }],
          };
        }),
      setCartQuantity: (variantId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.variantId === variantId
                ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) }
                : item,
            ),
        })),
      removeFromCart: (variantId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.variantId !== variantId,
          ),
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.productId !== productId),
        })),
      toggleFavorite: (item) =>
        set((state) => ({
          favorites: state.favorites.some(
            (favorite) => favorite.productId === item.productId,
          )
            ? state.favorites.filter(
                (favorite) => favorite.productId !== item.productId,
              )
            : [...state.favorites, item],
        })),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
    }),
    {
      name: "orelia-commerce",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        favorites: state.favorites,
      }),
      skipHydration: true,
    },
  ),
);
