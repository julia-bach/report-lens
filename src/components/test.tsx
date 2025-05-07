"use client";

import { useTranslations } from "next-intl";
import { apiClient } from "@/services/axios-instance";
import useSWR from "swr";

export default function Test({ hasError }: {hasError?: boolean}) {
  const t = useTranslations()

  const fetchData = async () => {
    const res = await apiClient.get("/api/test");
    await delay(3000)
    return res?.data
  };

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useSWR(hasError ? null : "/api/test", fetchData, {
    suspense: true,
    onSuccess: (data) => {
      console.log("Data fetched successfully", data);
    }
  })

  if (hasError) {
    return <div>ERROR</div>
  }

  return (
    <div className="bg-pink-200">{t("hello")}</div>
  );
}
