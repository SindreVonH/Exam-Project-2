import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  </React.StrictMode>
);
