'use client';

import { CATEGORIES } from '@/lib/categories';
import { MediaItem } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const categoryConfig = CATEGORIES[item.category];
  const Icon = categoryConfig.icon;

  return (
    <div className="group border-border bg-card hover:bg-muted/30 flex flex-col border p-4 transition-all">
      {/* Top Section: Flat & Clean */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-foreground">
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <Button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {/* Content: Sharp Typography */}
      <div className="flex-1 space-y-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight uppercase">{item.title}</h3>
        <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
          {item.creator || 'Unknown'} • {item.year}
        </p>
      </div>

      {/* Footer: Simple Text status instead of glowing dots */}
      <div className="border-border/50 mt-4 flex items-center justify-between border-t pt-2">
        <span className="text-primary/60 text-[9px] font-black tracking-[0.2em] uppercase">{item.status}</span>
      </div>
    </div>
  );
}
