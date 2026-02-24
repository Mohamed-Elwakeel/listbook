import { CategoryKey } from '@/lib/categories';

export type ReviewStatus = 'backlog' | 'in-progress' | 'completed' | 'dropped';

export interface BaseItem {
  id: string; // Unique ID (UUID or API ID)
  title: string; // The main name
  category: CategoryKey; // 'movies', 'books', etc.
  status: ReviewStatus; // Current tracking status
  image?: string; // Poster, cover, or thumbnail
  rating?: number; // User rating (e.g., 1-10 or 1-5)
  addedAt: number; // Timestamp for sorting
  notes?: string; // Personal thoughts
}

// Category-specific metadata
export interface MediaItem extends BaseItem {
  creator?: string; // Author, Director, Studio, or Artist
  year?: string; // Release year
  externalId?: string | number; // ID from the external API (TMDB, etc.)
}
