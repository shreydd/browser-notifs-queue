import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import IssuesTracker from "./components/IssuesTracker.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OriginalCode from "./components/originalCode.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/original-code",
    element: <OriginalCode />,
  },
  {
    path: "/issues",
    element: <IssuesTracker />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
