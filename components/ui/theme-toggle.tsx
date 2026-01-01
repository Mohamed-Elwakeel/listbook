'use client';

import { useDark } from '@/lib/hooks/use-dark';
import { Button } from './button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useDark();

  return (
    <Button variant="outline" size="sm" onClick={toggleDarkMode} aria-label="Toggle theme">
      {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {darkMode ? 'Light' : 'Dark'}
    </Button>
  );
}
