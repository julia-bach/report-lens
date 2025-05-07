"use client";

import Test from "@/components/test";
import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";

export default function Home() {
  return (
    <SuspenseWithErrorBoundary fallback={<div>tá carregando</div>}>
      <Test/>
    </SuspenseWithErrorBoundary>
  );
}
