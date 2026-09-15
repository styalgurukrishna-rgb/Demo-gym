import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KSG Demo Gym - Uncaught Component Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          id="app-error-boundary-screen"
          className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 my-8 mx-auto max-w-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6">
            We encountered a temporary display issue. Click below to refresh and resume your experience.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Page</span>
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Back Home</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
