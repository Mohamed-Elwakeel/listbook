import { MediaItem } from '@/types';
import { CategoryKey } from '@/lib/categories';

/** Raw result shape from TMDB search API (movies use title/release_date, TV use name/first_air_date). */
interface TmdbSearchResult {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
}

export async function searchTmdb(query: string, category: CategoryKey): Promise<MediaItem[]> {
  if (!query) return [];

  try {
    // 1. We call OUR Next.js backend, NOT TMDB directly!
    const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}&category=${category}`);

    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    // 2. Map the messy TMDB data into our clean MediaItem format
    // We use .slice(0, 5) to only show the top 5 results in the dropdown
    return (data.results as TmdbSearchResult[]).slice(0, 5).map((item): MediaItem => {
      // TMDB uses 'title' for movies, but 'name' for TV shows
      const title = item.title || item.name || 'Unknown';

      // Get the year from release_date (movies) or first_air_date (TV)
      const dateString = item.release_date || item.first_air_date || '';
      const year = dateString.split('-')[0] || 'Unknown';

      return {
        id: item.id.toString(), // Store TMDB's ID
        title: title,
        category: category,
        status: 'backlog', // Default status when adding a new item
        year: year,
        creator: 'TMDB', // Basic search doesn't return directors, so we put a placeholder
        // TMDB images require a base URL. 'w92' is a small, fast thumbnail size.
        image: item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : undefined,
        addedAt: Date.now(),
      };
    });
  } catch (error) {
    console.error('Frontend Service Error:', error);
    return [];
  }
}
