'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORIES, CategoryKey } from '@/lib/categories';
import { MediaItem } from '@/types';

export function SearchCommand() {
  const [query, setQuery] = useState('');
  const [activeCategory] = useQueryState('category', { defaultValue: 'movies' });

  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<MediaItem[]>([]);

  const cat = CATEGORIES[activeCategory as CategoryKey];
  const Icon = cat?.icon || Search;

  // Derive what to show: when query is too short, show empty and not searching (no setState in effect)
  const isQueryTooShort = query.trim().length < 2;
  const displayResults = isQueryTooShort ? [] : results;
  const displaySearching = !isQueryTooShort && isSearching;

  useEffect(() => {
    if (isQueryTooShort) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      setIsSearching(true);

      const fetchMockData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockResults: MediaItem[] = [
          {
            id: 'res-1',
            title: `${query} 1`,
            category: activeCategory as CategoryKey,
            status: 'backlog',
            creator: 'Creator A',
            year: '2024',
            addedAt: Date.now(),
          },
          {
            id: 'res-2',
            title: `${query} 2`,
            category: activeCategory as CategoryKey,
            status: 'backlog',
            creator: 'Creator B',
            year: '2023',
            addedAt: Date.now(),
          },
          {
            id: 'res-3',
            title: `${query} (Director&apos;s Cut)`, // FIX 2: Escaped apostrophe
            category: activeCategory as CategoryKey,
            status: 'backlog',
            creator: 'Creator C',
            year: '2022',
            addedAt: Date.now(),
          },
        ];

        setResults(mockResults);
        setIsSearching(false);
      };

      fetchMockData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, activeCategory, isQueryTooShort]);

  return (
    <div className="group relative mb-8 w-full">
      <div className="border-border bg-background focus-within:border-primary flex items-center border-b px-2 transition-colors">
        {displaySearching ? (
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
            {displaySearching && displayResults.length === 0 ? (
              <div className="text-muted-foreground p-4 text-center text-sm">Searching {cat.api}...</div>
            ) : displayResults.length > 0 ? (
              displayResults.map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-muted/50 border-border/50 group/item flex items-center gap-4 border-b px-4 py-3 transition-colors last:border-0"
                >
                  <div className="bg-muted border-border flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border">
                    <Icon size={16} className="text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium">{item.title}</h4>
                    <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
                      {item.creator} • {item.year}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity group-hover/item:opacity-100"
                    onClick={() => {
                      setQuery('');
                    }}
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
