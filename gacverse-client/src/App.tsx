import type { JSX } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./Router";
import ToasterProvider from "./providers/ToasterProvider";

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <ToasterProvider />
      <Router />
    </ThemeProvider>
  );
}

export default App;
