"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const sections = document.querySelectorAll(
      'main > section:not([data-no-scroll-reveal]), main [data-scroll-reveal-item], body > footer',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-scroll-reveal", "visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
    );

    sections.forEach((section) => {
      section.setAttribute("data-scroll-reveal", "pending");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
