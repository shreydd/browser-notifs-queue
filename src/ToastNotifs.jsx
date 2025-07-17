import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Toast({ id, removeToast }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setIsVisible(false);
      removeToast(id);
    }, 5000);

    return () => clearTimeout(timeoutHandler);
  }, [id, removeToast]);

  return (
    <div
      className={`border border-black w-32 rounded p-2 px-4 ${
        isVisible ? "" : "hidden"
      }`}
    >
      Toast!
    </div>
  );
}

export default function ToastNotifs() {
  const [activeToasts, setActiveToasts] = useState([]);
  const [remainingToastCount, setRemainingToastCount] = useState(0);

  function addToast() {
    const newToastId = Date.now(); // unique ID using timestamp

    if (activeToasts.length < 5) {
      setActiveToasts((prev) => [...prev, newToastId]);
    } else {
      setRemainingToastCount((prev) => prev + 1);
    }
  }

  function removeToastById(idToRemove) {
    setActiveToasts((prev) => prev.filter((id) => id !== idToRemove));
  }

  useEffect(() => {
    if (activeToasts.length < 5 && remainingToastCount > 0) {
      const newToastId = Date.now();
      setActiveToasts((prev) => [...prev, newToastId]);
      setRemainingToastCount((prev) => prev - 1);
    }
  }, [activeToasts.length, remainingToastCount]);

  return (
    <section className="flex flex-col gap-4 items-center justify-center h-dvh">
      <h1 className="text-xl font-normal">Native Web Notification API</h1>
      <button className="border p-1 px-2" onClick={addToast}>
        Toastify me!
      </button>

      <p className="text-red-500">Remaining toasts: {remainingToastCount}</p>
      <p className="text-green-500">Active toasts: {activeToasts.length}</p>

      <div className="absolute top-1 right-1 space-y-1">
        {activeToasts.map((id) => (
          <Toast key={id} id={id} removeToast={removeToastById} />
        ))}
      </div>
    </section>
  );
}
