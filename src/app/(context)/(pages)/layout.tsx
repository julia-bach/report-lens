"use client";

import React from "react";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Cat } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { Routes } from "@/utils/constants";
import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <SuspenseWithErrorBoundary fallback={<div>ta carregando...</div>}>
      <div className="min-h-screen bg-background">
        <Navbar maxWidth="xl" className="shadow-sm">
          <NavbarBrand>
            <div className="flex items-center gap-3">
              <Cat width={28} height={28} className="text-defaultAppColors-primary-300" />
              <p className="font-semibold text-lg text-inherit hidden sm:block text-defaultAppColors-secondary-500">{t("reportLens")}</p>
            </div>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-5" justify="center">
            <NavbarItem>
              <Link href={Routes.HOME} className={cn("font-medium", pathname === Routes.HOME ?
                "text-defaultAppColors-primary-500" : "text-black")}>
                {t("navbar.home")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={Routes.TIMELINE} className={cn("font-medium", pathname.includes(Routes.TIMELINE) ?
                "text-defaultAppColors-primary-500" : "text-black")}>
                {t("navbar.timeline")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" className="font-medium">
                {t("navbar.dashboards")}
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              {/*TODO: logo opcional*/}
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="container">
          {children}
        </div>
      </div>
    </SuspenseWithErrorBoundary>
  );
}