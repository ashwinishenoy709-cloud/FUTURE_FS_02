import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? (
        <Moon size={19} strokeWidth={1.8} />
      ) : (
        <Sun size={19} strokeWidth={1.8} />
      )}
    </button>
  );
}