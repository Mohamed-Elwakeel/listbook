'use client';

import { useQueryState } from 'nuqs';
import { CATEGORIES, CategoryKey } from '@/lib/categories';
import { cn } from '@/lib/utils';

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useQueryState('category', {
    defaultValue: 'movies' as CategoryKey,
  });

  return (
    <div className="no-scrollbar w-full overflow-x-auto pb-2">
      {/* The Segmented Control Container (Light Gray/Dark Gray background) */}
      <div className="bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1">
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
          const category = CATEGORIES[key];
          const isActive = activeCategory === key;

          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                'focus-visible:ring-ring inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none',
                isActive
                  ? 'bg-background text-foreground shadow-sm' // Active: High contrast (White/Black bg with Black/White text)
                  : 'hover:bg-muted-foreground/10 hover:text-foreground', // Inactive: Subtle hover
              )}
            >
              <category.icon size={16} className="mr-2" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
