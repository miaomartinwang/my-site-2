<script lang="ts">
  let newsMore = false;

  function showMoreNews() {
    newsMore = !newsMore;
  }
</script>

<div class="min-h-screen bg-background text-foreground antialiased">
  <div class="mx-auto max-w-4xl px-6 py-12 md:px-10 lg:py-16">

    <section class="mb-20">
      <h1 class="mb-8 text-4xl font-bold tracking-tight md:text-5xl">About</h1>

      <div class="prose prose-neutral max-w-none space-y-6 text-lg leading-relaxed">
        <p>
          I am a Ph.D. student in Cinema and Media Studies at the University of Chicago.
          My work explores media technologies — from mid-20th-century film projectors to contemporary
          cryptographic systems and CAPTCHAs.
        </p>

        <p>
          I generally adopt a <strong>post-hermeneutic</strong> approach, asking how the material
          specificities of media infrastructures quietly structure sociopolitical relations,
          power distributions, and possibilities of perception.
        </p>

        <p>
          Current / ongoing projects include:
        </p>

        <ul class="ml-6 list-disc space-y-2 marker:text-primary">
          <li>A media-archaeological history of CAPTCHAs as sites of human–machine boundary work</li>
          <li>The political ecology and cultural life of Chinese programming languages</li>
          <li>Knowledge management platforms (Notion, Obsidian, Zotero, etc.) and new forms of cognitive alienation</li>
          <li>Preparing for qualifying exams in politics of computing, materialisms, and media theory</li>
        </ul>

        <p class="mt-8">
          Before joining UChicago, I received an M.A. from Columbia University and a B.A. from Tsinghua University.
          My most recent CV is available
          <a href="/cv" class="text-primary hover:underline font-medium">here</a>.
        </p>
      </div>
    </section>

    <section>
      <h1 class="mb-8 text-4xl font-bold tracking-tight md:text-5xl">News</h1>

      <div class="space-y-5">
        <article class="group relative rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <time class="mb-1 block text-sm font-medium text-muted-foreground">March 29, 2026</time>
          <p class="text-lg font-semibold leading-snug">
            Presentation at SCMS 2026
          </p>
          <p class="mt-1.5 text-muted-foreground">
            I will present my paper <em>“Humanness in Flux: CAPTCHAs, the War on Bots, and Digital Capitalism”</em> in the session
            <strong>“From Grids to Platforms”</strong> (N03) • 9:00–10:45 am • Chicago
          </p>
          <p class="mt-1 text-sm text-muted-foreground/80">Location: tbd</p>
        </article>

        <article class="group relative rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <time class="mb-1 block text-sm font-medium text-muted-foreground">December 10, 2025</time>
          <p class="text-lg font-semibold leading-snug">
            Student Essay Award
          </p>
          <p class="mt-1.5 text-muted-foreground">
            My article <em>“Formatting Chinese Cinema: Small-Gauge Film Projectors in the Socialist Era”</em> received the
            <strong>Student Essay Award</strong> from the Nontheatrical Film & Media Scholarly Interest Group
            (Society for Cinema and Media Studies) and The Association of Moving Image Archivists.
          </p>
          <p class="mt-2 text-sm italic text-muted-foreground/90">
            Forthcoming in <em>The Moving Image</em>.
          </p>
        </article>

        {#if newsMore}
          <article class="rounded-lg border border-border bg-card p-5 opacity-75">
            <time class="mb-1 block text-sm text-muted-foreground">…</time>
            <p class="text-muted-foreground">More news items will appear here when available.</p>
          </article>
        {/if}
      </div>

      <div class="mt-8 text-right">
        <button
          type="button"
          on:click={showMoreNews}
          class="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {newsMore ? 'Collapse −' : 'Expand +' }
        </button>
      </div>
    </section>

  </div>
</div>