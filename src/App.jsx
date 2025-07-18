import BrowserNotifs from "./components/BrowserNotifs";
import ToastNotifs from "./components/ToastNotifs";

export default function App() {
  const notifsGranted = Notification.permission === "granted";
  console.log("🚀 ~ App ~ notifsGranted:", notifsGranted);

  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-4">
      {notifsGranted ? <BrowserNotifs /> : <ToastNotifs />}
    </div>
  );
}