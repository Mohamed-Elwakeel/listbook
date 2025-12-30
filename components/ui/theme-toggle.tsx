'use client';

import { Button } from './button';
import { useThemeStore } from '@/lib/zustand-theme';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { darkMode, toggle } = useThemeStore();

  return (
    <Button variant="outline" size="sm" onClick={toggle} aria-label="Toggle theme">
      {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}
