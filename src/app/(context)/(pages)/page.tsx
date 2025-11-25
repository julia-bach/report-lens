"use client";

import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";
import Loading from "@/components/loading";

export default function Home() {
  return (
    <SuspenseWithErrorBoundary fallback={<Loading/>}>
    </SuspenseWithErrorBoundary>
  );
}
