"use client";

import React, { useEffect, useState } from "react";
import { axiosInterceptorsRequest, axiosInterceptorsResponse } from "@/services/axios-instance";
import { useTranslations } from "next-intl";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  // Garante que nada seja renderizado antes da hidratação
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    axiosInterceptorsResponse(t);
    axiosInterceptorsRequest(t);
    setHydrated(true);
  }, []);

  return hydrated && children;
}
