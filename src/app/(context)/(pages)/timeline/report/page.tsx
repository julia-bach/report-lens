import { Report } from "@/components/pages/timeline/report/report.page";
import Loading from "@/components/loading";
import React from "react";
import SuspenseWithErrorBoundary from "@/components/error/suspense-with-error-boundary";

export default function ReportPage() {
  return (
    <SuspenseWithErrorBoundary fallback={<Loading/>}>
      <Report/>
    </SuspenseWithErrorBoundary>
  );
}