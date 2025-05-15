import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/storage/authStore";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useDarkMode();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-[var(--color-background)] font-instrument">
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 bg-[var(--color-surface)] rounded-b-md flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-[40px] font-semibold text-[var(--color-nav-active)]">
            Holidaze
          </NavLink>

          {/* Nav Links */}
          <ul className="flex items-center gap-8 text-[24px] font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--color-nav-active)]"
                    : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition-colors"
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
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition-colors"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition-colors"
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
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition-colors"
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
                        : "text-[var(--color-nav-inactive)] hover:text-[var(--color-nav-active)] transition-colors"
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
                className="p-2 rounded hover:bg-[var(--color-muted)]/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
