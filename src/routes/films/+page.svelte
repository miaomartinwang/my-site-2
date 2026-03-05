<script lang='ts'>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    type FilmData = {
        Title: string; Year: string; Rated: string; Released: string;
        Runtime: string; Genre: string; Director: string; Writer: string;
        Actors: string; Plot: string; Poster: string; Response: string;
        Comment?: string;
    }

    let listTitle = $state<string>('')
    let listAuthor = $state<string>('')
    let nameListStatus = $state<boolean>(false)
    let filmTitle = $state<string>('')
    let userComment = $state<string>('')
    let filmList = $state<FilmData[]>([])

    async function searchFilm() {
        if (!filmTitle) return;
        const filmUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(filmTitle)}&apikey=b30a3fa2`;
        const filmRes = await fetch(filmUrl);
        const filmData = await filmRes.json()

        if (filmData.Response === 'True') {
            filmData.Comment = userComment
            filmList = [...filmList, filmData]
            userComment = ''
            filmTitle = ''
        } else {
            alert("Sorry, we cannot find the film!")
        }    
    }

    function removeFilm(index: number) {
        filmList = filmList.filter((_, idx) => idx !== index);
    }

    function move(index: number, direction: number) {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= filmList.length) return;
        const newList = [...filmList];
        [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
        filmList = newList;
    }
</script>

<div class="max-w-3xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <header class="text-center space-y-2">
        <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-slate-400 bg-clip-text text-transparent">
            🎞️ FilmStack
        </h1>
        <p class="text-muted-foreground">Curate and share your cinematic journey.</p>
    </header>

    {#if !nameListStatus}
        <!-- Step 1 -->
        <Card.Root class="w-full">
            <Card.Header>
                <Card.Title>Step 1: Name your List</Card.Title>
            </Card.Header>
            <Card.Content class="space-y-4">
                <div class="grid gap-2">
                    <Label for="listTitle">List Title</Label>
                    <Input id="listTitle" placeholder="e.g., My All-Time Favorites" bind:value={listTitle} />
                </div>
                <div class="grid gap-2">
                    <Label for="listAuthor">Author</Label>
                    <Input id="listAuthor" placeholder="Your name" bind:value={listAuthor} />
                </div>
            </Card.Content>
            <Card.Footer>
                <Button class="w-full" disabled={!listTitle} onclick={() => nameListStatus = true}>Start Adding Films</Button>
            </Card.Footer>
        </Card.Root>
    {:else}
        <!-- Step 2 -->
        <Card.Root class="border-primary/20 bg-primary/5">
            <Card.Content class="pt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label>Film Title</Label>
                        <Input placeholder="Search OMDb..." bind:value={filmTitle} />
                    </div>
                    <div class="space-y-2">
                        <Label>Your Review</Label>
                        <Input placeholder="Why do you love it?" bind:value={userComment} />
                    </div>
                </div>
                <Button class="mt-4 w-full" variant="default" onclick={searchFilm}>Add to List</Button>
            </Card.Content>
        </Card.Root>

        <!-- List Display -->
        <div class="space-y-6">
            <div class="flex items-end justify-between">
                <div>
                    <h2 class="text-2xl font-bold">{listTitle}</h2>
                    <p class="text-sm text-muted-foreground">Curated by {listAuthor || 'Anonymous'}</p>
                </div>
                <Badge variant="secondary">{filmList.length} Films</Badge>
            </div>
            
            <Separator />

            {#each filmList as filmItem, i}
                <Card.Root class="overflow-hidden transition-all hover:shadow-md">
                    <div class="flex flex-col md:flex-row">
                        <img 
                            src={filmItem.Poster !== 'N/A' ? filmItem.Poster : 'https://via.placeholder.com'} 
                            alt={filmItem.Title}
                            class="w-full md:w-48 h-72 md:h-auto object-cover"
                        />
                        <div class="flex-1 p-6 space-y-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-xl font-bold">#{i+1} {filmItem.Title}</h3>
                                    <p class="text-sm text-muted-foreground">{filmItem.Year} • Directed by {filmItem.Director}</p>
                                </div>
                                <div class="flex gap-1">
                                    <Button variant="ghost" size="icon" onclick={() => move(i, -1)}>↑</Button>
                                    <Button variant="ghost" size="icon" onclick={() => move(i, 1)}>↓</Button>
                                    <Button variant="destructive" size="icon" onclick={() => removeFilm(i)}>✕</Button>
                                </div>
                            </div>
                            
                            <div class="text-sm line-clamp-3">
                                <span class="font-semibold text-primary italic">" {filmItem.Comment} "</span>
                            </div>
                            
                            <div class="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-xs text-muted-foreground">
                                <strong>Cast:</strong> {filmItem.Actors}
                                <strong>Plot:</strong> {filmItem.Plot}
                            </div>
                        </div>
                    </div>
                </Card.Root>
            {/each}
        </div>
    {/if}
</div>
