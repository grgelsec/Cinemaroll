import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/homepage.tsx";
import Films from "./components/films.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/films",
        element: <Films />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(

    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>

);
