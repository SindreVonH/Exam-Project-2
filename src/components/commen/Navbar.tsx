import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/storage/authStore";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-[var(--color-background)] font-instrument">
      <nav className="shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 bg-[var(--color-surface)] rounded-b-md flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-[32px] sm:text-[40px] font-semibold text-[var(--color-nav-active)]"
          >
            Holidaze
          </NavLink>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded hover:bg-[var(--color-muted)]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Nav Links – desktop */}
          <ul className="hidden sm:flex items-center gap-6 md:gap-8 text-[18px] md:text-[22px] font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--color-nav-active)]"
                    : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                }
              >
                Home
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[var(--color-nav-active)]"
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[var(--color-nav-active)]"
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[var(--color-nav-active)]"
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded hover:bg-[var(--color-muted)]/10 transition"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="sm:hidden bg-[var(--color-surface)] px-6 pt-4 pb-6 rounded-b-md space-y-4 text-[18px] font-medium">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-[var(--color-nav-active)]"
                  : "block text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
              }
            >
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block text-[var(--color-nav-active)]"
                      : "block text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="block text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block text-[var(--color-nav-active)]"
                      : "block text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block text-[var(--color-nav-active)]"
                      : "block text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition"
                  }
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded hover:bg-[var(--color-muted)]/10 transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
