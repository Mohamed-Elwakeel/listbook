'use client';

import { MediaCard } from '@/components/features/media-card';
import { useListStore } from '@/store/useListStore';
import { MediaItem } from '@/types';
import { Search } from 'lucide-react';

// Temporarily mock data for design testing
const MOCK_ITEMS: MediaItem[] = [
  {
    id: '1',
    title: 'Inception',
    category: 'movies',
    status: 'completed',
    creator: 'Christopher Nolan',
    year: '2010',
    addedAt: Date.now(),
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    category: 'books',
    status: 'backlog',
    creator: 'F. Scott Fitzgerald',
    year: '1925',
    addedAt: Date.now(),
  },
  {
    id: '3',
    title: 'Elden Ring',
    category: 'games',
    status: 'in-progress',
    creator: 'FromSoftware',
    year: '2022',
    addedAt: Date.now(),
  },
];

export function MediaList() {
  const { items } = useListStore();
  const displayItems = items.length > 0 ? items : MOCK_ITEMS;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayItems.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}

      {/* The "Add New" Placeholder Card */}
      <div className="group border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 flex h-full min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all">
        <div className="bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary mb-2 rounded-full p-3 transition-colors">
          <Search size={24} />
        </div>
        <p className="text-muted-foreground group-hover:text-primary text-sm font-medium">Add Something New</p>
      </div>
    </div>
  );
}
