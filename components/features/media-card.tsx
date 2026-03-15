'use client';

import { CATEGORIES } from '@/lib/categories';
import { MediaItem } from '@/types';
import { ExternalLink, MoreVertical } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const categoryConfig = CATEGORIES[item.category];
  const Icon = categoryConfig.icon;

  return (
    <div className="group border-border/50 bg-card hover:border-primary/50 relative flex flex-col gap-3 rounded-3xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Section: Icon & Actions */}
      <div className="flex items-start justify-between">
        <div className="bg-primary/5 text-primary ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors">
          <Icon size={24} />
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-1">
        <h3 className="line-clamp-1 text-lg font-bold tracking-tight">{item.title}</h3>
        <p className="text-muted-foreground line-clamp-1 text-xs">
          {item.creator ? item.creator : categoryConfig.label} • {item.year || 'N/A'}
        </p>
      </div>

      {/* Bottom Section: Status & Meta */}
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {/* Simple Status Dot/Badge */}
          <span className="relative flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
          <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            {item.status.replace('-', ' ')}
          </span>
        </div>

        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink size={14} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
