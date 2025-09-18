export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("✅  Notification granted");
  } else {
    console.warn("❌  Notification rejected");
  }
}
// Helper: convert VAPID key
export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
