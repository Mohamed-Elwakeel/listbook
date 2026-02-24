'use client';

import { useListStore } from '@/store/useListStore';
import { CATEGORIES } from '@/lib/categories';

export function MediaList() {
  const { items } = useListStore();

  if (items.length === 0) {
    return (
      <div className="border-border flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed text-center">
        <p className="text-muted-foreground text-lg">Your list is empty.</p>
        <p className="text-sm opacity-70">Start by adding a new item above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const categoryConfig = CATEGORIES[item.category];
        const Icon = categoryConfig.icon;

        return (
          <div
            key={item.id}
            className="bg-background transition-hover flex items-center gap-4 rounded-2xl border p-4 shadow-sm hover:shadow-md"
          >
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Icon size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-xs capitalize">{item.status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
