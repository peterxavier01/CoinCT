"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ErrorUIProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorUI = ({ error, resetErrorBoundary }: ErrorUIProps) => {
  const isApiError = error.name === "ApiError";
  const errorMessage = isApiError
    ? "Failed to fetch cryptocurrency data. Please try again."
    : "Something went wrong. Please try again.";

  return (
    <div
      id="error-ui"
      className="flex flex-col items-center justify-center min-h-[400px] w-full py-12 px-4"
    >
      <div className="bg-dark-500 rounded-xl border border-purple-600/20 p-8 md:p-12 max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-400/20 p-4">
            <AlertCircle className="size-12 text-red-400" />
          </div>
        </div>

        {/* Error Title */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Oops! Something went wrong
          </h2>
          <p className="text-purple-100 text-sm md:text-base">{errorMessage}</p>
        </div>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="bg-dark-400 rounded-lg p-4 border border-purple-600/10">
            <p className="text-xs text-red-400 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {resetErrorBoundary && (
            <Button
              onClick={resetErrorBoundary}
              variant="outline"
              className="border-purple-600/30 hover:bg-purple-600/10 hover:border-purple-600/50 text-purple-100"
            >
              <RefreshCw className="size-4" />
              Try Again
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            className="border-purple-600/30 hover:bg-purple-600/10 hover:border-purple-600/50 text-purple-100"
          >
            <Link href="/">
              <Home className="size-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorUI;
