self.addEventListener("push", async (e) => {
  const { message, body } = JSON.parse(e.data.text());

  e.waitUntil(
    self.registration.showNotification(message, {
      body,
      icon: "/Images/jj-logo.png",
      badge: "/Images/jj-logo.png",
      vibrate: [100, 50, 100],
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client)
            return client.focus("/jobs");
        }
        if (clients.openWindow) return clients.openWindow("/jobs");
      }),
  );
});
