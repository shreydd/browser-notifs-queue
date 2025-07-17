import BrowserNotifs from "./BrowserNotifs";
import ToastNotifs from "./ToastNotifs";

export default function App() {
  const notifsGranted = Notification.permission === "granted";
  console.log("🚀 ~ App ~ notifsGranted:", notifsGranted);

  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  if (notifsGranted) return <BrowserNotifs />;

  return <ToastNotifs />;
}
