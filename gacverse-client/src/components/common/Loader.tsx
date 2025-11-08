import { LoaderCircleIcon } from "lucide-react";
import type { JSX } from "react";

interface Loader {
  size?: number;
  color?: "purple" | "blue" | "green" | "yellow" | "gray" | "white";
}

const colorMap: Record<string, string> = {
  purple: "text-purple-500",
  blue: "text-blue-500",
  green: "text-green-500",
  gray: "text-gray-500",
  white: "text-white",
};

export const SpinnerLoader = ({ size = 24, color = "gray" }: Loader): JSX.Element => {
  const spinnerColor = colorMap[color] || "text-gray-500";
  return <LoaderCircleIcon size={size} className={`${spinnerColor} animate-spin`} />;
};
