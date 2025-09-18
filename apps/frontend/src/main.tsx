import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { urlBase64ToUint8Array } from "./utils/requestNotificationPermission.ts";
import { subscribe } from "./utils/subscribeRequest.ts";
import { variables } from "./utils/vars.ts";
const publicVapidKey = variables.VAPID_PUBLIC;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(async (registration) => {
        console.log("✅ Service Worker registered:", registration);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        console.log("✅ Subscribed!", subscription);

        // 4. Send subscription to your backend
        subscribe(subscription);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}
