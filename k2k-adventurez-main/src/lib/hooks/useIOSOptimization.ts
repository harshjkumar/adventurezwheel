import { useEffect, useState } from "react";

/**
 * Hook for iOS-specific optimizations and device detection
 * Handles safe area insets, device orientation, and OS detection
 */
export const useIOSOptimization = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isNotched, setIsNotched] = useState(false);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    // Detect iOS
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const iosMatch = /iPad|iPhone|iPod/.test(userAgent);
    const safariMatch = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    setIsIOS(iosMatch);
    setIsSafari(iosMatch && safariMatch);

    // Detect notched devices (iPhone X+)
    const hasNotch =
      iosMatch &&
      (window.innerHeight > window.innerWidth
        ? window.innerWidth === 375 || window.innerWidth === 390 || window.innerWidth === 430 // iPhone notch widths
        : window.innerHeight === 375 || window.innerHeight === 390 || window.innerHeight === 430);
    
    setIsNotched(hasNotch);

    // Get safe area insets
    const getCSSVariableValue = (varName: string): number => {
      const value =
        typeof getComputedStyle !== "undefined"
          ? getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
          : "0px";
      return parseInt(value) || 0;
    };

    setSafeAreaInsets({
      top: getCSSVariableValue("env(safe-area-inset-top)"),
      bottom: getCSSVariableValue("env(safe-area-inset-bottom)"),
      left: getCSSVariableValue("env(safe-area-inset-left)"),
      right: getCSSVariableValue("env(safe-area-inset-right)"),
    });

    // Prevent rubber band scroll
    const preventRubberBand = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const parent = target.closest(
        "[data-allow-scroll], body, html, .modal, .dropdown-menu"
      );
      
      if (!parent) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventRubberBand, { passive: false });

    // Handle viewport height on iOS Safari
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      document.removeEventListener("touchmove", preventRubberBand);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return {
    isIOS,
    isSafari,
    isNotched,
    safeAreaInsets,
  };
};

/**
 * Hook to prevent iOS zoom on input focus
 */
export const usePreventIOSZoom = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll(
      "input, textarea, select"
    ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

    inputs.forEach((input) => {
      // Set font size to 16px to prevent iOS zoom
      input.style.fontSize = "16px";
    });
  }, []);
};

/**
 * Hook to handle safe area padding for fixed elements
 */
export const useSafeAreaPadding = () => {
  const { safeAreaInsets } = useIOSOptimization();

  const getPaddingStyle = (position: "top" | "bottom" | "left" | "right") => {
    return {
      paddingTop: position === "top" ? `${safeAreaInsets.top}px` : 0,
      paddingBottom: position === "bottom" ? `${safeAreaInsets.bottom}px` : 0,
      paddingLeft: position === "left" ? `${safeAreaInsets.left}px` : 0,
      paddingRight: position === "right" ? `${safeAreaInsets.right}px` : 0,
    };
  };

  return {
    safeAreaInsets,
    getPaddingStyle,
  };
};
