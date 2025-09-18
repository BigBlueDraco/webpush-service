export async function subscribe(subscription: any) {
  await fetch(
    import.meta.env.VITE_BACKEND_URL + "/notifications/push/subscribe",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );
}
