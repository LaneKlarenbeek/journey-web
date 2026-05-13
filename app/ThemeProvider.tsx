"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem={true}
      // This maps the library's themes to your specific global CSS classes
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      {children}
    </NextThemesProvider>
  );
}