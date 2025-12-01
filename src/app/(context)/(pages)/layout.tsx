"use client";

import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { Cat, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { Routes } from "@/utils/constants";
import { getOptionalLogo } from "@/utils/get-env";
import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";
import { useInitProjectName } from "@/hook/use-project-name";
import Loading from "@/components/loading";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { projectName, setProjectName, projects, loading, showDropdown } = useInitProjectName();
  const t = useTranslations();
  const pathname = usePathname();

  const optionalLogo = getOptionalLogo();

  return (
    <SuspenseWithErrorBoundary fallback={<Loading/>}>
      <div className="min-h-screen bg-background">
        <Navbar maxWidth="xl" className="shadow-sm">
          <NavbarBrand>
            <div className="flex items-center gap-3">
              <Cat width={28} height={28} className="text-primary-300" />
              <p className="font-semibold text-lg text-inherit hidden sm:block text-black">{t("reportLens")}</p>
            </div>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-5" justify="center">
            {/*<NavbarItem>*/}
            {/*  <Link href={Routes.HOME} className={cn("font-medium", pathname === Routes.HOME ?*/}
            {/*    "text-primary-500" : "text-gray-500")}>*/}
            {/*    {t("navbar.home")}*/}
            {/*  </Link>*/}
            {/*</NavbarItem>*/}
            <NavbarItem>
              <Link href={Routes.TIMELINE} className={cn("font-medium", pathname.includes(Routes.TIMELINE) ?
                "text-primary-500" : "text-gray-500")}>
                {t("navbar.timeline")}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={Routes.DASHBOARDS} className={cn("font-medium", pathname.includes(Routes.DASHBOARDS) ?
                "text-primary-500" : "text-gray-500")}>
                {t("navbar.dashboards")}
              </Link>
            </NavbarItem>

            {showDropdown && !loading && (
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className={cn("p-0 bg-transparent data-[hover=true]:bg-transparent font-medium text-[14px]",
                        "text-gray-500 gap-1"
                      )}
                      radius="sm"
                      variant="light"
                      endContent={<ChevronDown size={16}/>}
                    >
                      {projectName
                        ? projectName.replace(/^./, s => s.toUpperCase())
                        : "Select Project"}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu>
                  {projects.map(project => {
                    const label = project.replace(/^./, s => s.toUpperCase());

                    return (
                      <DropdownItem
                        key={project}
                        onClick={() => setProjectName(project)}
                        className="font-medium text-gray-500"
                      >
                        {label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            )}
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              { optionalLogo && (
                <img src={optionalLogo} alt={""} width={40} height={40} />
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