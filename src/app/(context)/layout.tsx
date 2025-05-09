"use client";

import React, { useEffect, useState } from "react";
import { axiosInterceptorsRequest, axiosInterceptorsResponse } from "@/services/axios-instance";
import { useTranslations } from "next-intl";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  // Garante que nada seja renderizado antes da hidratação
  const [hydrated, setHydrated] = useState(false);

  ModuleRegistry.registerModules([AllCommunityModule]);

  useEffect(() => {
    axiosInterceptorsResponse(t);
    axiosInterceptorsRequest(t);
    setHydrated(true);
  }, []);

  return hydrated && children;
}
