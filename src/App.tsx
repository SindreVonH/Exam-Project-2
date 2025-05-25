import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
        <AppRouter />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </BrowserRouter>
  );
}
