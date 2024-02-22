"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import NextAuthSessionProvider from "@/components/next-auth-session-provider";
import { AuthHandlerProvider } from "@/hooks/useAuthHandlers";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <NextAuthSessionProvider>
          {/* has custom auth handling functions */}
          <AuthHandlerProvider>{children}</AuthHandlerProvider>
        </NextAuthSessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
