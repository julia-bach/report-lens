"use client";

import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
};

export function Providers({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={"UTC"}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </NextIntlClientProvider>
  );
}
