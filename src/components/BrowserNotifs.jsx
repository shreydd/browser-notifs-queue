import { useEffect, useState } from "react";

export default function BrowserNotifs() {
  const [remainingNotifs, setRemainingNotifs] = useState(0); // user clicked but needs to wait it out
  const [activeNotifs, setActiveNotifs] = useState(0); //active notifs in the user notifs bar

  function closeBrowserNotifs(notification) {
    notification.close();
    setActiveNotifs((prev) => prev - 1);
  }

  function notifyMe() {
    setActiveNotifs((prev) => prev + 1);
    const notification = new Notification(`Hi there!`);
    setTimeout(() => closeBrowserNotifs(notification), 5000);
  }

  function manageNotifsDisplay() {
    if (activeNotifs <= 4) {
      return notifyMe();
    }
    setRemainingNotifs((prev) => prev + 1); // push to remaining when active is full
  }

  useEffect(() => {
    if (activeNotifs < 5 && remainingNotifs > 0) {
      notifyMe();
      setRemainingNotifs(prev => prev - 1)
    }
  }, [activeNotifs]);

  return (
    <section className="flex flex-col gap-4 items-center justify-center p-6">
      <h1 className="text-xl font-normal">Native Web Notification API</h1>
      <button
        className="border p-1 cursor-pointer px-2"
        onClick={() => manageNotifsDisplay()}
      >
        Notify me!
      </button>

      <p className="text-red-500">Remaining notifs : {remainingNotifs}</p>
      <p className="text-green-500">Active notifs : {activeNotifs}</p>
    </section>
  );
}
