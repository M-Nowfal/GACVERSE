import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";
import type { JSX } from "react";

const ToasterProvider = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Toaster 
      richColors
      duration={5000}
      expand
      swipeDirections={["left", "right"]}
      position="top-center"
      theme={theme}
    />
  );
}

export default ToasterProvider;
