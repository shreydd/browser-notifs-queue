import { useEffect, useState } from "react";

export default function App() {
  const [toastVisibility, setToastVisibility] = useState(false);

  const [clickCounts, setClickCounts] = useState(0); // number of times user clicked click
  const [remainingNotifs, setRemainingNotifs] = useState(0); // user clicked but needs to wait it out
  const [activeNotifs, setActiveNotifs] = useState(0); //active notifs in the user notifs bar

  function closeToasts() {
    console.log("close toasts here");
    setToastVisibility(false);
  }

  function closeBrowserNotifs(notification) {
    console.log("close browser notifs here");
    notification.close();
    setActiveNotifs((prev) => prev - 1);
  }

  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(`Hi there!`);

      setTimeout(() => closeBrowserNotifs(notification), 5000);
    } else {
      setToastVisibility(true);
      console.log("notifs in toast");
      setTimeout(() => closeToasts(), 1000);
    }
  }

  function triggerNotif() {
    if (remainingNotifs > 0) {
      // if active notifs less than 5 push
      if (activeNotifs >= 0 && activeNotifs <= 4) {
        // push notifs here
        notifyMe();
        setActiveNotifs((prev) => prev + 1);
        setRemainingNotifs((prev) => prev - 1);
      }
    }
  }

  function manageNotifsDisplay() {
    setClickCounts((prev) => prev + 1);
    setRemainingNotifs((prev) => prev + 1);
    triggerNotif()
  }

  useEffect(() => {
    if (activeNotifs <= 4) {
      triggerNotif()
    }
  }, [activeNotifs]);

  return (
    <section className="flex flex-col gap-4 items-center justify-center h-dvh">
      <h1 className="text-xl font-normal">Native Web Notification API</h1>
      <button className="border p-1 px-2" onClick={() => manageNotifsDisplay()}>
        Notify me!
      </button>

      <p className="text-red-500">Remaining notifs : {remainingNotifs}</p>
      <p className="text-green-500">Active notifs : {activeNotifs}</p>

      <p className="text-blue-500">Clicks: {clickCounts}</p>

      {toastVisibility ? (
        <div className={"border absolute top-1 right-1"}>Toast</div>
      ) : (
        <></>
      )}
    </section>
  );
}
