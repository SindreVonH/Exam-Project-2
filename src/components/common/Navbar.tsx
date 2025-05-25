import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/storage/authStore";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Moon, Sun, Menu, X } from "lucide-react";
import LogoLight from "../../assets//logo-light.svg";
import LogoDark from "../../assets/logo-dark.svg";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const logoSrc = isDark ? LogoDark : LogoLight;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-[var(--color-background)] font-instrument">
      <nav className="shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 bg-[var(--color-surface)] rounded-b-md flex items-center justify-between h-[72px] sm:h-[80px]">
          {/* Logo + Text */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="Holidaze logo"
              className="h-18 w-18 sm:h-24 sm:w-24 object-contain overflow-hidden"
            />
            <span className="text-[28px] sm:text-[34px] font-semibold text-[var(--color-nav-active)]">
              Holidaze
            </span>
          </NavLink>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded hover:bg-[var(--color-muted)]/10 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-[var(--color-text)]" />
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
                {isDark ? (
                  <Sun className="w-5 h-5 text-[var(--color-text)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--color-text)]" />
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <aside
            role="menu"
            aria-label="Main menu"
            className="absolute top-4 right-4 w-[220px] bg-[var(--color-surface)] rounded-lg shadow-lg animate-slide-in z-50"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-2 right-2 p-2 text-[var(--color-text)] hover:opacity-80"
            >
              <X size={20} />
            </button>

            <nav className="flex flex-col gap-2 p-4 pt-10">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2"
              >
                <span className="text-lg text-[var(--color-nav-active)]">Home</span>
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--color-text)] px-4 py-2 rounded hover:bg-[var(--color-border)] active:scale-95 transition"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-[var(--color-text)] text-left px-4 py-2 rounded hover:bg-[var(--color-border)] active:scale-95 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--color-text)] px-4 py-2 rounded hover:bg-[var(--color-border)] active:scale-95 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--color-text)] px-4 py-2 rounded hover:bg-[var(--color-border)] active:scale-95 transition"
                  >
                    Register
                  </NavLink>
                </>
              )}

              <hr className="my-2 border-[var(--color-border)]" />

              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 text-[var(--color-text)] px-4 py-2 rounded hover:bg-[var(--color-border)] active:scale-95 transition"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm">Dark mode</span>
              </button>
            </nav>
          </aside>
        )}
      </nav>
    </header>
  );
}
