// src/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer"; // 👈 legg til denne
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleVenuePage from "./pages/SingleVenuePage";
import ProfilePage from "./pages/ProfilePage";
import DesignSystem from "./pages/DesignSystem";

export default function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/venues/:id" element={<SingleVenuePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test-theme" element={<DesignSystem />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
