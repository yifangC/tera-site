'use client';

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle dark mode"
      type="button"
      className="ml-1 mr-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-sm p-1 sm:ml-4"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <span className="hidden dark:block">
        <FaSun aria-hidden className="theme-switch" />
      </span>
      <span className="block dark:hidden">
        <FaMoon aria-hidden className="theme-switch" />
      </span>
    </button>
  );
}
