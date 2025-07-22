"use client";

import React, { useEffect, useState } from "react";
import { axiosInterceptorsRequest, axiosInterceptorsResponse } from "@/services/axios-instance";
import { useTranslations } from "next-intl";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useWindowHeightStore } from "@/store/window-height-store";
import { useWindowHeight } from "@/hook/use-component-size";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  const windowsHeight = useWindowHeight();
  const { setHeight } = useWindowHeightStore((state) => state);

  // Garante que nada seja renderizado antes da hidratação
  const [hydrated, setHydrated] = useState(false);

  ModuleRegistry.registerModules([AllCommunityModule]);

  useEffect(() => {
    axiosInterceptorsResponse(t);
    axiosInterceptorsRequest(t);
    setHydrated(true);
  }, []);

  useEffect(() => {
    setHeight(windowsHeight);
  }, [windowsHeight]);

  return hydrated && children;
}
