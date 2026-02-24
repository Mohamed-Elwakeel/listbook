import { useThemeStore } from '../../store/zustand-theme';

export function useDark() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggle);
  return { darkMode, toggleDarkMode };
}
