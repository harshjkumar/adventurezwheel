"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the current device is running iOS or macOS Safari.
 * This covers iPhone, iPad, Mac Safari — all WebKit-based browsers
 * that share the same rendering engine and performance characteristics.
 */
export function useIsIOS(): boolean {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const platform = (navigator as any).platform || "";

    // Detect iPhone, iPad, iPod
    const isiOSDevice = /iPhone|iPad|iPod/.test(ua);

    // Modern iPads report as "MacIntel" with touch support
    const isIPadOS =
      platform === "MacIntel" && navigator.maxTouchPoints > 1;

    // Mac Safari (non-Chrome, non-Firefox)
    const isMacSafari =
      /Macintosh/.test(ua) &&
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Firefox/.test(ua);

    setIsIOS(isiOSDevice || isIPadOS || isMacSafari);
  }, []);

  return isIOS;
}
