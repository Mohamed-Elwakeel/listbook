import { NextResponse } from 'next/server';

// This function only runs on your server. It is completely hidden from the browser.
export async function GET(request: Request) {
  // 1. Extract the search query and category from the URL
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // 2. Figure out which TMDB endpoint to use
  const endpoint = category === 'tv' ? 'search/tv' : 'search/movie';

  // TMDB requires the query to be URL-encoded (e.g., "dark knight" -> "dark%20knight")
  const url = `https://api.themoviedb.org/3/${endpoint}?query=${encodeURIComponent(query)}&language=en-US&page=1`;

  try {
    // 3. Make the secure request to TMDB using your secret token
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        // process.env securely reads from your .env.local file
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Send the data back to your frontend Waiter-style
    return NextResponse.json(data);
  } catch (error) {
    console.error('Backend TMDB Error:', error);
    return NextResponse.json({ results: [], error: 'Failed to fetch data' }, { status: 500 });
  }
}
