'use client';

import { useState } from 'react';
// import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES, CategoryKey } from '@/lib/categories';

export function SearchCommand() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="group relative z-50 mx-auto mb-12 max-w-2xl">
      {/* Search Input Box */}
      <div className="from-primary absolute -inset-1 rounded-2xl bg-linear-to-r to-purple-600 opacity-20 blur-sm transition duration-500 group-focus-within:opacity-40"></div>

      <div className="border-border bg-card relative flex items-center rounded-2xl border px-4 shadow-xl">
        {/* {isSearching ? (
          <Loader2 className="text-primary mr-3 animate-spin" size={20} />
        ) : (
          <Search className="text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
        )} */}
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 2);
          }}
          placeholder="Search movies, books, games..."
          className="border-none bg-transparent py-6 text-lg shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Dropdown Portal */}
      {isOpen && (
        <div className="border-border bg-card animate-in fade-in zoom-in-95 absolute mt-2 w-full overflow-hidden rounded-2xl border shadow-2xl duration-200">
          <div className="max-h-[400px] overflow-y-auto p-2">
            {/* Category Section Example */}
            {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
              const cat = CATEGORIES[key];
              const Icon = cat.icon;

              return (
                <div key={key} className="mb-2 last:mb-0">
                  <div className="text-muted-foreground/50 flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                    <Icon size={12} />
                    {cat.label}
                  </div>

                  {/* Mock Result Item */}
                  <div className="hover:bg-primary/10 group/item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Sample {cat.label} Result</span>
                      <span className="text-muted-foreground text-[10px]">Subtext or Creator</span>
                    </div>
                    <button className="bg-primary text-primary-foreground rounded-lg px-3 py-1 text-[10px] font-bold opacity-0 transition-opacity group-hover/item:opacity-100">
                      ADD TO LIST
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-border bg-muted/50 text-muted-foreground flex justify-between border-t px-4 py-2 text-[10px]">
            <span>Press Enter to search all</span>
            <span>ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
