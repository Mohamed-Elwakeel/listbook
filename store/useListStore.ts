import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MediaItem } from '@/types';

interface ListState {
  items: MediaItem[];
  addItem: (item: Omit<MediaItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateStatus: (id: string, status: MediaItem['status']) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(),
              addedAt: Date.now(),
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, status } : i)),
        })),
    }),
    { name: 'collectanea-list-storage' },
  ),
);
