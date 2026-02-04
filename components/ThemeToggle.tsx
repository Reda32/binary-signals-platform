"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../app/ThemeProvider";
import "./ThemeToggle.css";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}
