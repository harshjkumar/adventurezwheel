"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A global utility that forces the window to jump to the top of the page on every route change.
 * This is crucial for Next.js App Router where scroll restoration sometimes fails on client-side state-heavy transitions.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Globally disable browser's automatic scroll restoration once
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // 2. Perform an instant jump to (0,0) on every pathname change.
    // We override the 'scroll-behavior: smooth' in CSS temporarily to prevent sliding.
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // 3. Clear any body overflow locks that might have been left by mobile menus
    document.body.style.overflow = "";

    // 4. Restore the default scroll behavior from CSS
    const timer = requestAnimationFrame(() => {
       document.documentElement.style.scrollBehavior = "";
       // Second jump as a safety measure for async-loaded content
       window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  return null;
}
