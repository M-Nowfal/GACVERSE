import type { JSX } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./Router";

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
