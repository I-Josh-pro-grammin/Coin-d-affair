import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Route render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Un problème est survenu</h2>
            <p className="text-gray-600">Veuillez rafraîchir la page ou réessayer plus tard.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


