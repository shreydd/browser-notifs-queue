import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import IssuesTracker from "./components/IssuesTracker.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import OriginalCode from "./components/originalCode.jsx";
import Header from "./components/Header.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
