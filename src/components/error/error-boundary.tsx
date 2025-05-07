import React from "react";
import { AxiosError } from "axios";

interface ErrorBoundaryProps {
  children: React.ReactNode
  /**
   * Componente a ser renderizado em caso de erro.
   * Se não fornecido, rendera os `children` mesmo após erro.
   */
  fallbackComponent?: React.ReactNode
}

interface ErrorBoundaryState {
  hasErrorAxios: boolean
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasErrorAxios: false, hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof AxiosError) {
      return { hasErrorAxios: true, hasError: false };
    }
    return { hasError: true, hasErrorAxios: false };
  }

  render() {
    const { hasError, hasErrorAxios } = this.state;
    const { children, fallbackComponent } = this.props;

    if (hasError) {
      return <div>Erro ao renderizar componente</div>;
    }

    if (fallbackComponent && hasErrorAxios) {
      // Se passou o componente, renderiza ele
      return fallbackComponent;
    }

    return children;
  }
}

export default ErrorBoundary;
