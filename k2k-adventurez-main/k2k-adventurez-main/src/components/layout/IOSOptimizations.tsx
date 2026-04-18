"use client";

import { useIsIOS } from "@/hooks/useIsIOS";

/**
 * Injects iOS-only CSS optimizations via a <style> tag.
 * These rules ONLY apply when the user is on an Apple/WebKit device.
 * Desktop Chrome/Firefox/Edge users see ZERO changes.
 *
 * Key fixes:
 * 1. Disables `background-attachment: fixed` (broken on iOS Safari, causes jitter)
 * 2. Removes `backdrop-filter: blur()` which is extremely GPU-expensive on WebKit
 * 3. Disables hover-based scale transforms (no hover on touch devices anyway)
 * 4. Adds hardware acceleration hints for animated elements
 * 5. Prevents input zoom on focus (font-size >= 16px)
 */
export function IOSOptimizations() {
  const isIOS = useIsIOS();

  if (!isIOS) return null;

  return (
    <style jsx global>{`
      /* ══ iOS / Safari Performance Fixes ══ */
      /* These styles are injected ONLY on Apple devices */

      /* 1. Fix parallax — bg-fixed is broken on iOS, causes massive jitter */
      .bg-fixed,
      [style*="background-attachment: fixed"] {
        background-attachment: scroll !important;
      }

      /* 2. Remove backdrop-blur — extremely expensive on WebKit compositor */
      .backdrop-blur-sm,
      .backdrop-blur-md,
      .backdrop-blur-lg,
      .backdrop-blur-xl {
        -webkit-backdrop-filter: none !important;
        backdrop-filter: none !important;
      }

      /* 3. Disable hover scale transforms on images (no hover on touch anyway) */
      @media (hover: none) {
        .group:hover .group-hover\\:scale-105,
        .group:hover .group-hover\\:scale-\\[1\\.03\\] {
          transform: none !important;
        }

        /* Also disable the CTA background image scale on hover */
        .group:hover .group-hover\\:scale-105 {
          transform: none !important;
        }
      }

      /* 4. Optimize compositing for key animated layers */
      header,
      nav {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }

      /* 5. Prevent iOS from zooming on input focus */
      @media screen and (max-width: 768px) {
        input, textarea, select {
          font-size: 16px !important;
        }
      }

      /* 6. Optimize scroll performance */
      html {
        -webkit-overflow-scrolling: touch;
      }

      /* 7. Reduce animation durations slightly for smoother feel */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
