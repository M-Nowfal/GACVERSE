import { AlertCircle, AlertTriangle, RefreshCw, Server, WifiOff } from "lucide-react";
import type { JSX } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ErrorProps {
  resource: string;
  onRetry: () => void;
  error?: string;
  variant?: "network" | "server" | "client" | "timeout" | "unknown" | "rate-limit" | "generic" | "not-found";
  action?: {
    label: string;
    onClick: () => void;
  };
};

const Error = ({
  resource = "unknown",
  onRetry,
  error,
  variant = "generic",
  action
}: ErrorProps): JSX.Element => {

  const getIcon = () => {
    switch (variant) {
      case "network":
        return <WifiOff className="w-12 h-12 text-amber-500" />;
      case "server":
        return <Server className="w-12 h-12 text-rose-500" />;
      case "not-found":
        return <AlertCircle className="w-12 h-12 text-blue-500" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-rose-500" />;
    }
  };

  const getTitle = () => {
    switch (variant) {
      case "network":
        return "Connection Issue";
      case "server":
        return "Server Error";
      case "not-found":
        return `${resource.charAt(0).toUpperCase() + resource.slice(1)} Not Found`;
      default:
        return `Failed to Load ${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
    }
  };

  const getDescription = (): string => {
    if (error) return error;

    switch (variant) {
      case "network":
        return `We"re having trouble connecting to the server. Please check your internet connection and try again.`;
      case "server":
        return `Something went wrong on our end while loading the ${resource}. Our team has been notified.`;
      case "not-found":
        return `The ${resource} you"re looking for couldn"t be found. It may have been removed or doesn"t exist.`;
      default:
        return `We encountered an unexpected error while loading the ${resource}. Please try again in a moment.`;
    }
  };

  return (
    <Card className="flex flex-col items-center text-center m-auto gap-6 w-[90%] max-w-md p-8 shadow-lg border">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 dark:bg-gray-700">
        {getIcon()}
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {getTitle()}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {getDescription()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          onClick={() => onRetry()}
          variant="primary"
          className="w-full gap-2"
          size="lg"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>

        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;
