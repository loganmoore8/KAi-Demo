"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function useSystemTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    
    // Set initial theme based on current preference
    setTheme(mediaQuery.matches ? "dark" : "light");

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setTheme]);
}
