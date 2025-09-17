export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.error("Цей браузер не підтримує нотифікації");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("✅ Дозвіл на нотифікації отримано");
  } else {
    console.warn("❌ Дозвіл відхилено");
  }
}
