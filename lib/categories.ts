import { Music, Gamepad2, BookOpen, Clapperboard, Tv, Podcast, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CategoryKey = 'movies' | 'games' | 'books' | 'music' | 'tv' | 'podcasts' | 'other';

export type Category = {
  label: string;
  api: string;
  placeholder: string;
  icon: LucideIcon;
};

export const CATEGORIES: Record<CategoryKey, Category> = {
  movies: {
    label: 'Movies',
    api: 'tmdb',
    placeholder: 'Search for a movie',
    icon: Clapperboard,
  },
  games: {
    label: 'Games',
    api: 'igdb',
    placeholder: 'Search for a game',
    icon: Gamepad2,
  },
  books: {
    label: 'Books',
    api: 'openlibrary',
    placeholder: 'Search for a book',
    icon: BookOpen,
  },
  music: {
    label: 'Music',
    api: 'musicbrainz',
    placeholder: 'Search for a song',
    icon: Music,
  },
  tv: {
    label: 'TV',
    api: 'tvmaze',
    placeholder: 'Search for a TV show',
    icon: Tv,
  },
  podcasts: {
    label: 'Podcasts',
    api: 'podcastindex',
    placeholder: 'Search for a podcast',
    icon: Podcast,
  },
  other: {
    label: 'Other',
    api: 'wikipedia',
    placeholder: 'Search for anything',
    icon: HelpCircle,
  },
};
