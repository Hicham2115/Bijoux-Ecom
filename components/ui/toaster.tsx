"use client";

import { useEffect, useState } from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { X } from "lucide-react";

type ToastMessage = {
  id: number;
  title: string;
  description?: string;
};

let nextToastId = 0;
const toastListeners = new Set<(message: ToastMessage) => void>();
const pendingToasts: ToastMessage[] = [];

export function toast(message: Omit<ToastMessage, "id">) {
  const nextMessage = { ...message, id: ++nextToastId };
  if (toastListeners.size === 0) {
    pendingToasts.push(nextMessage);
    return;
  }
  toastListeners.forEach((listener) => listener(nextMessage));
}

export function Toaster() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    function showToast(message: ToastMessage) {
      setMessages((current) => [...current.slice(-3), message]);
    }

    toastListeners.add(showToast);
    pendingToasts.splice(0).forEach(showToast);
    return () => {
      toastListeners.delete(showToast);
    };
  }, []);

  return (
    <ToastPrimitive.Provider duration={5500} swipeDirection="right">
      {messages.map((message) => (
        <ToastPrimitive.Root
          key={message.id}
          onOpenChange={(open) => {
            if (!open) {
              setMessages((current) => current.filter((item) => item.id !== message.id));
            }
          }}
          className="relative flex w-full items-start gap-3 border border-[#b99045]/60 bg-[#080907] px-5 py-4 pr-11 text-[#f5f1e9] shadow-[0_16px_48px_rgba(0,0,0,0.3)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
        >
          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-[#d7b878]" />
          <div>
            <ToastPrimitive.Title className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e5cf9f]">
              {message.title}
            </ToastPrimitive.Title>
            {message.description && (
              <ToastPrimitive.Description className="mt-1.5 font-serif text-[14px] leading-relaxed text-white/75">
                {message.description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close aria-label="Fermer la notification" className="absolute right-3 top-3 grid size-8 place-items-center text-white/55 transition-colors hover:text-white">
            <X className="size-4" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex w-[min(390px,calc(100vw-2rem))] flex-col gap-3 outline-none" />
    </ToastPrimitive.Provider>
  );
}
