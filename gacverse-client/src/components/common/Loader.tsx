import { LoaderCircleIcon } from "lucide-react";
import type { JSX } from "react";

interface Loader {
  size?: number;
  color?: "red" | "blue" | "green" | "yellow" | "gray";
}

const colorMap: Record<string, string> = {
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  gray: "text-gray-500",
};

export const SpinnerLoader = ({ size = 24, color = "gray" }: Loader): JSX.Element => {
  const spinnerColor = colorMap[color] || "text-gray-500";
  return <LoaderCircleIcon size={size} className={`${spinnerColor} animate-spin`} />;
};
