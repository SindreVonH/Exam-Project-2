import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
  </React.StrictMode>
);
