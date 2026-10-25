'use client';

import { useTheme } from 'next-themes';
import { IconContext } from 'react-icons';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-16 w-16 rounded-sm p-1 sm:ml-4"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <IconContext.Provider value={{ className: 'theme-switch' }}>
        <span className="hidden dark:inline">
          <FaSun />
        </span>
        <span className="inline dark:hidden">
          <FaMoon />
        </span>
      </IconContext.Provider>
    </button>
  );
}
