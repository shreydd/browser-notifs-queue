# React + Vite + Tailwind

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Has TailwindCSS already setup and types for react installed.

To start the dev server
```
npm run dev
```

To start a build
```
npm run build
```

# Question
Build a browser-based notification system with the following features:
When the user clicks a button, a notification is triggered using the browser’s native Web Notification API.
The system must allow a maximum of 5 active notifications. If a new notification is triggered after reaching the limit, the oldest notification should be closed.
If the browser does not support notifications or the user has denied notification permissions, the system should gracefully fallback to showing an in-app toast message instead.
The user should be able to enter a custom notification message and click a button to send it.
The UI should provide a "Clear All" option to dismiss all active notifications (both browser and toast).