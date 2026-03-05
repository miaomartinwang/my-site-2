/**
 * src/lib/types.ts
 *
 * Shared TypeScript types for the app.
 * Add your API types here as you work with more data sources.
 *
 * Why put types here?
 *   - One definition, used everywhere
 *   - Import with: import type { Artwork } from '$lib/types';
 *   - The $lib alias always points to src/lib/ in SvelteKit
 */

// ── Art Institute of Chicago API ─────────────────────────────────────────────
// Describes one object in the "data" array from:
//   https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_display,date_display,image_id

export type Artwork = {
  id:              number;       // unique artwork ID, e.g. 27992
  title:           string;       // always present, e.g. "A Sunday on La Grande Jatte"
  artist_display:  string | null; // may be null for anonymous works
  date_display:    string | null; // may be null, e.g. "1884-86"
  image_id:        string | null; // may be null — use {#if art.image_id} before rendering
};

// ── Open-Meteo API ───────────────────────────────────────────────────────────
// Describes the shape of current_weather from:
//   https://api.open-meteo.com/v1/forecast?...&current_weather=true

export type CurrentWeather = {
  temperature: number;  // degrees (Fahrenheit or Celsius depending on param)
  windspeed:   number;  // km/h
  weathercode: number;  // WMO weather code (0 = clear, 95 = thunderstorm, etc.)
  time:        string;  // ISO timestamp
};
