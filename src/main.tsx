import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { SessionProvider } from "./context/SessionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionProvider>
);
