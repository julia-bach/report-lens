"use client";

import React from "react";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Cat } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { Routes } from "@/utils/constants";
import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";
import { getOptionalLogo } from "@/utils/get-env";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();
  const pathname = usePathname();

  const optionalLogo = getOptionalLogo();

  return (
    <SuspenseWithErrorBoundary fallback={<div>ta carregando...</div>}>
      <div className="min-h-screen bg-background">
        <Navbar maxWidth="xl" className="shadow-sm">
          <NavbarBrand>
            <div className="flex items-center gap-3">
              <Cat width={28} height={28} className="text-primary-300" />
              <p className="font-semibold text-lg text-inherit hidden sm:block text-black">{t("reportLens")}</p>
            </div>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-5" justify="center">
            <NavbarItem>
              <Link href={Routes.HOME} className={cn("font-medium", pathname === Routes.HOME ?
                "text-primary-500" : "text-gray-500")}>
                {t("navbar.home")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={Routes.TIMELINE} className={cn("font-medium", pathname.includes(Routes.TIMELINE) ?
                "text-primary-500" : "text-gray-500")}>
                {t("navbar.timeline")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" className="font-medium text-gray-500">
                {t("navbar.dashboards")}
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              { optionalLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={optionalLogo} alt={""} width={35} height={35} />
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div>
          {children}
        </div>
      </div>
    </SuspenseWithErrorBoundary>
  );
}