import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//import { BrowserRouter, createBrowserRouter } from "react-router-dom";
//import Home from "./components/homepage.tsx";

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }
])
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);
