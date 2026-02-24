'use client';

import { useThemeStore } from '@/store/zustand-theme';

export function ThemeProvider() {
  const darkMode = useThemeStore((state) => state.darkMode);

  // This runs on every render
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', darkMode);
  }

  return null;
}
