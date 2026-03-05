<script lang='ts'>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Table from "$lib/components/ui/table/index.js";

    type FilmData = {
        Title: string
        Year: string
        Rated: string
        Released: string
        Runtime: string
        Genre: string
        Director: string
        Writer: string
        Actors: string
        Plot: string
        Poster: string
        Response: string
    }

    let listTitle = $state<string>('')
    let listAuthor = $state<string>('')
    let nameListStatus = $state<boolean>(false)
    let filmTitle = $state<string>('')
    let userComment = $state<string>('')
    let filmRetrieve = $state<boolean>(false)
    let film = $state<FilmData | null>(null)
    let errorMsg = $state<sring>('')
    let filmList = $state([])

    function nameList() {
        nameListStatus = true
    }

    async function searchFilm() {
        const filmUrl = `http://www.omdbapi.com/?t=${filmTitle}&apikey=b30a3fa2`;
        const filmRes = await fetch(filmUrl);
        const filmData = await filmRes.json()

        film = filmData

        if (film.Response === 'True') {
            film.Comment = userComment
            filmList.push(film)
            filmRetrieve = true
            userComment = ''
            filmTitle = ''
        } else {
            errorMsg = "Sorry, we cannot find the film. Please check the title again!"
            alert(errorMsg)
            filmTitle = ''
        }    
        console.log(filmList)
    }

    function removeFilm(index: number) {
        filmList = filmList.filter((_, idx) => idx !== index);
    }

    function swap(arr, i, j) {
        if (i < 0 || j < 0 || i >= filmList.length || j >= filmList.length) return;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

</script>

<p class="text-2xl font-black">🎞️ Generate your film lists! 🎞️</p>

{#if !nameListStatus}
    <p class="text-xl">Step 1: Name your List!</p>

    <form>
        <div class="formGroup">
            <label for="filmTitle">List Title:</label>
            <input type="text" id="filmTitle" placeholder="enter your list title" bind:value={listTitle}>
        </div>

        <div class="formGroup">
            <label for="listAuthor">Author:</label>
            <input type="text" id="listAuthor" placeholder="who authors the list? (optional)" bind:value={listAuthor}>
        </div>

        <Button onclick={nameList}>Next</Button>
    </form>
{/if}

{#if nameListStatus}
    <p class="text-xl">Step 2: Add Films!</p>
    <form>
        <div class="formGroup">
            <label for="filmTitle">Film Title:</label>
            <input type="text" id="filmTitle" placeholder="enter the film title" bind:value={filmTitle}>    
        </div>

        <div class="formGroup">
            <label for="filmTitle">Comment:</label>
            <input type="text" id="userComment" placeholder="your comment" bind:value={userComment}>    
        </div>

        <Button onclick={searchFilm}>Search</Button>
    </form>
{/if}

{#if nameListStatus}
    <p>{listTitle} by {listAuthor}</p>
    {#each filmList as filmItem, i }
        <Card.Root>
            <Card.Header>
                <Card.Title>#{i+1} {filmItem.Title}</Card.Title>
                <!-- <Card.Description>Current Conditions</Card.Description> -->
            </Card.Header>
            <Card.Content>
                <img src='{filmItem.Poster}' alt="film poster of {filmItem.Title}"/>
                <p>Year: {filmItem.Year}</p>
                <p>Director: {filmItem.Director}</p>
                <p>Actors: {filmItem.Actors}</p>
                <p>Plot: {filmItem.Plot}</p>
                <p>Comment: </p>
                <div class="box-border size-32 border-4 p-4">
                    <p>{filmItem.Comment}</p>
                </div>
                <Button onclick={() => removeFilm(i)}>Remove</Button>
                <Button onclick={() => swap(filmList, i, i-1)}>Up</Button>
                <Button onclick={() => swap(filmList, i, i+1)}>Down</Button>
            </Card.Content>
        </Card.Root>
    {/each}
{/if}


<style>

</style>