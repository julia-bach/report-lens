"use client";

import React, { ReactElement, ReactNode, Suspense } from "react";
import ErrorBoundary from "@/components/error/error-boundary";

interface SuspenseWithErrorBoundaryProps {
  children?: ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export default function SuspenseWithErrorBoundary({ fallback, children, errorFallback }: SuspenseWithErrorBoundaryProps) {
  const childrenFallback = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<{ hasError: boolean }>, {
        hasError: true
      });
    }
    return child;
  });

  return (
    <ErrorBoundary fallbackComponent={errorFallback ? errorFallback : childrenFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
