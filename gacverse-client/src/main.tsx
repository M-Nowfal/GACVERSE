import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

createRoot(document.getElementById("root")!).render(
  <App />
);

registerSW({
  onNeedRefresh() {
    console.log("New version available. Refresh to update!");
  },
  onOfflineReady() {
    console.log("App ready to work offline!");
  },
});
