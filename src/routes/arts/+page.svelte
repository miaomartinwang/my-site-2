<!--
  src/routes/art/+page.svelte

  This page does two things:
    1. Displays "featured" artworks loaded by +page.ts when the route opens
    2. Lets the user search for any artwork interactively

  HOW IT CONNECTS TO +page.ts:
    - SvelteKit automatically calls load() in +page.ts before rendering this page
    - The returned object { featured: [...] } becomes available as `data.featured`
    - We receive it with: const { data } = $props()

  PATTERN USED HERE (two data sources, one display):
    - `displayed` is a $derived value
    - If the user has searched: show their results
    - Otherwise: show the featured artworks from load()
    - One {#each} block handles both cases
-->

<script lang="ts">
  import type { Artwork } from '$lib/types';

  // ── Receive data from +page.ts ──────────────────────────────────────────
  // $props() is how Svelte 5 components receive data.
  // SvelteKit passes the load() return value as `data`.
  const { data } = $props<{ data: { featured: Artwork[] } }>();

  // ── Constants ───────────────────────────────────────────────────────────
  // IIIF image server base URL — images are built by appending:
  //   /{image_id}/full/{width},/0/default.jpg
  const IIIF = 'https://www.artic.edu/iiif/2';

  // ── Reactive state ──────────────────────────────────────────────────────
  let query   = $state('');           // current text in the search box
  let results = $state<Artwork[]>([]); // search results (empty = not searched yet)
  let loading = $state(false);
  let error   = $state<string | null>(null);

  // $derived recomputes whenever `results` or `data` changes
  const displayed = $derived(results.length > 0 ? results : data.featured);

  // READ from localStorage once on mount — restores last search query
  $effect(() => {
    const saved = localStorage.getItem('lastQuery');
    if (saved) query = saved;
  });

  // ── Search function ─────────────────────────────────────────────────────
  async function searchArt() {
    if (!query.trim()) {
      results = [];
      return;
    }

    loading = true;
    error   = null;

    // WRITE: save to localStorage here in the action, NOT in $effect
    // (saving in $effect fires on mount with the empty default, wiping the saved value)
    localStorage.setItem('lastQuery', query);

    try {
      const url =
        'https://api.artic.edu/api/v1/artworks/search' +
        `?q=${encodeURIComponent(query)}` +
        '&fields=id,title,artist_display,date_display,image_id' +
        '&limit=12';

      const res  = await fetch(url);
      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const json = await res.json();
      results = (json.data ?? []) as Artwork[];

    } catch (e) {
      error = e instanceof Error ? e.message : 'Something went wrong';
    } finally {
      loading = false;
    }
  }

  // Allow pressing Enter in the input to trigger search
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') searchArt();
  }
</script>

<!-- ── Page markup ─────────────────────────────────────────────────────── -->

<main class="max-w-5xl mx-auto px-4 py-8">

  <!-- Page header -->
  <h1 class="text-3xl font-bold mb-2">Art Institute of Chicago</h1>
  <p class="text-gray-500 mb-6">
    Explore 100,000+ artworks. Data from the Art Institute's open API.
  </p>

  <!-- ── Search bar ──────────────────────────────────────────────────── -->
  <div class="flex gap-2 mb-8">
    <input
      bind:value={query}
      onkeydown={handleKeydown}
      type="text"
      placeholder="Search artworks..."
      aria-label="Search artworks"
      class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
    <button
      onclick={searchArt}
      disabled={loading}
      class="bg-teal-600 hover:bg-teal-700 disabled:opacity-50
             text-white text-sm px-4 py-2 rounded transition-colors"
    >
      {loading ? 'Searching...' : 'Search'}
    </button>
  </div>

  <!-- ── Section heading — tells user which data they're seeing ──────── -->
  <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
    {results.length > 0 ? `${results.length} results for "${query}"` : 'Featured: Chicago'}
  </h2>

  <!-- ── Error state ─────────────────────────────────────────────────── -->
  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-700 rounded p-4 mb-6">
      <strong>Error:</strong> {error}
    </div>
  {/if}

  <!-- ── Artwork grid ─────────────────────────────────────────────────── -->
  <!--
    `displayed` is $derived — it's either search results or featured artworks.
    One {#each} handles both cases. The page "just works" as you switch between them.
  -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
    {#each displayed as art (art.id)}

      <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">

        <!-- Image — only if image_id exists -->
        {#if art.image_id}
          <img
            src="{IIIF}/{art.image_id}/full/400,/0/default.jpg"
            alt={art.title}
            class="w-full aspect-square object-cover"
            loading="lazy"
          />
        {:else}
          <!-- Placeholder when no image is available -->
          <div class="w-full aspect-square bg-gray-100 flex items-center justify-center">
            <span class="text-gray-400 text-sm">No image</span>
          </div>
        {/if}

        <!-- Artwork info -->
        <div class="p-3">
          <h3 class="font-semibold text-sm leading-tight line-clamp-2">
            {art.title}
          </h3>
          <p class="text-gray-500 text-xs mt-1 line-clamp-1">
            {art.artist_display ?? 'Unknown artist'}
          </p>
          {#if art.date_display}
            <p class="text-gray-400 text-xs mt-0.5">{art.date_display}</p>
          {/if}
        </div>

      </article>

    {:else}
      <!-- {#each ... } ... {:else} renders when the array is empty -->
      <p class="col-span-full text-gray-400 text-center py-12">
        No artworks found. Try a different search.
      </p>
    {/each}
  </div>

</main>
