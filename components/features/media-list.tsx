'use client';

import { useListStore } from '@/store/useListStore';
import { useQueryState } from 'nuqs';
import { MediaCard } from './media-card';

export function MediaList() {
  const { items } = useListStore();
  const [activeCategory] = useQueryState('category', { defaultValue: 'movies' });

  // Only show items that match the current Tab (Filtering logic)
  const filteredItems = items.filter((item) => item.category === activeCategory);

  if (filteredItems.length === 0) {
    return (
      <div className="border-border flex h-40 items-center justify-center border border-dashed text-center">
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          No {activeCategory} in your collection
        </p>
      </div>
    );
  }

  return (
    <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
      {/* gap-px with bg-border creates a clean "Grid Line" look instead of separate cards */}
      {filteredItems.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
