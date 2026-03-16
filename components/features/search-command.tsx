'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { Search, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // <-- Import Sonner

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORIES, CategoryKey } from '@/lib/categories';
import { MediaItem } from '@/types';

import { searchTmdb } from '@/services/tmdb'; // Your real API service
import { useDebounce } from '@/lib/hooks/use-debounce'; // The new hook
import { useListStore } from '@/store/useListStore'; // Your Zustand store
import Image from 'next/image';

export function SearchCommand() {
  const [query, setQuery] = useState('');
  const [activeCategory] = useQueryState('category', { defaultValue: 'movies' });

  // 1. Magical Debounce Hook (waits 500ms automatically)
  const debouncedQuery = useDebounce(query, 500);

  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<MediaItem[]>([]);

  // 2. Grab the addItem function from your store
  const addItem = useListStore((state) => state.addItem);

  const cat = CATEGORIES[activeCategory as CategoryKey];
  const Icon = cat?.icon || Search;

  // 3. Clean useEffect that listens ONLY to the debounced query
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        // Fetch real data based on category
        if (activeCategory === 'movies' || activeCategory === 'tv') {
          const data = await searchTmdb(debouncedQuery, activeCategory as CategoryKey);
          setResults(data);
        } else {
          setResults([]); // Other APIs not built yet
        }
      } catch {
        toast.error('Failed to connect to search service.');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, activeCategory]);

  // 4. Handler for adding items
  const handleAddItem = (item: MediaItem) => {
    // Tell ESLint to ignore the unused variables we are extracting
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, addedAt, ...itemDataToSave } = item;

    addItem(itemDataToSave);
    setQuery(''); // Close dropdown
    toast.success(`"${item.title}" added to your collection!`);
  };

  return (
    <div className="group relative mb-8 w-full">
      <div className="border-border bg-background focus-within:border-primary flex items-center border-b px-2 transition-colors">
        {isSearching ? (
          <Loader2 className="text-muted-foreground animate-spin" size={18} />
        ) : (
          <Icon className="text-muted-foreground" size={18} />
        )}
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={cat?.placeholder || 'Search...'}
          className="rounded-none border-none bg-transparent py-6 text-base shadow-none focus-visible:ring-0"
        />
      </div>

      {query.length >= 2 && (
        <div className="bg-background border-border animate-in fade-in slide-in-from-top-2 absolute top-full left-0 z-50 w-full border border-t-0 shadow-lg duration-200">
          <div className="max-h-80 overflow-y-auto">
            {isSearching && results.length === 0 ? (
              <div className="text-muted-foreground p-4 text-center text-sm">Searching {cat.api}...</div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-muted/50 border-border/50 group/item flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-0"
                >
                  {/* Poster Image or Icon */}
                  <div className="bg-muted border-border relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill sizes="40px" className="object-cover" />
                    ) : (
                      <Icon size={16} className="text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium">{item.title}</h4>
                    <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
                      {item.creator || 'Unknown'} • {item.year}
                    </p>
                  </div>

                  {/* Add Button triggers Zustand and Sonner */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity group-hover/item:opacity-100"
                    onClick={() => handleAddItem(item)}
                  >
                    <Plus className="mr-1" size={12} />
                    Add
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground p-4 text-center text-sm">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>

          <div className="bg-muted/30 border-border flex items-center justify-between border-t px-4 py-2">
            <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
              Source: {cat.api}
            </span>
            <kbd className="bg-background border-border text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[10px]">
              ESC
            </kbd>
          </div>
        </div>
      )}
    </div>
  );
}
