import { create } from 'zustand';

interface ThemeState {
  darkMode: boolean;
  toggle: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggle: () =>
    set((state) => {
      const newMode = !state.darkMode;
      document.documentElement.classList.toggle('dark', newMode);
      return { darkMode: newMode };
    }),
  setDarkMode: (value: boolean) => () => {
    document.documentElement.classList.toggle('dark', value);
    return { darkMode: value };
  },
}));
