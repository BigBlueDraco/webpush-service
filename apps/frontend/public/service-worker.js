self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "Push";
  const options = {
    body: data.body || "Push",
    icon: "/icon.png",
    badge: "/badge.png",
    data: data.url || "/",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("click", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Нове повідомлення";
  const options = {
    body: data.body || "У тебе є нова нотифікація",
    icon: "/icon.png", // додай свою іконку
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
