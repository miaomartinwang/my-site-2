/**
 * src/routes/art/+page.ts
 *
 * SvelteKit "load function" — runs automatically when /art is visited.
 * Whatever this function returns is available as `data` in +page.svelte.
 *
 * KEY POINTS:
 *  - Use the `fetch` from the function parameter, NOT window.fetch
 *    (SvelteKit's fetch works on both server and client; window.fetch doesn't)
 *  - Return a plain object — SvelteKit passes it to the page as `data`
 *  - If the request fails, return an empty array so the page still renders
 */

import type { Artwork } from '$lib/types';

export async function load({ fetch }) {
  // Step 1: Build the URL
  // - q=chicago     → search term (try changing this!)
  // - fields=...    → only request the fields we need (faster response)
  // - limit=6       → 6 artworks to show as "featured" on page load
  const url =
    'https://api.artic.edu/api/v1/artworks/search' +
    '?q=chicago' +
    '&fields=id,title,artist_display,date_display,image_id' +
    '&limit=6';
  const res = await fetch(url);

  // Step 3: Handle failure gracefully — don't crash the whole page
  if (!res.ok) {
    console.error('Art Institute API error:', res.status);
    return { featured: [] as Artwork[] };
  }

  // Step 4: Parse JSON
  const json = await res.json();

  // Step 5: Return data
  // - json.data is the array of artworks (NOT json directly)
  // - ?? [] is a safety net if json.data is somehow null
  // - "as Artwork[]" tells TypeScript: trust me, this matches our type
  return {
    featured: (json.data ?? []) as Artwork[]
  };
}
