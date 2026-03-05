<script lang='ts'>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    // import * as Table from "$lib/components/ui/table/index.js";

    // import { MapLibre, DefaultMarker } from 'svelte-maplibre';
    import WeatherMap from "$lib/components/WeatherMap.svelte";
    import ForecastTable from "$lib/components/ForecastTable.svelte";


    
    // type DailyForecast = {
    //     time: string[];
    //     temperature_2m_max: number[];
    //     temperature_2m_min: number[];
    //     precipitation_probability_max: number[];
    // };

    type WeatherData = {
        current: {
            temperature_2m: number;
            weathercode: number;
            windspeed_10m: number;
        };
    };


    let city = $state<string>('Chicago');
    let weather = $state<WeatherData | null>(null);
    let loading = $state<boolean>(false);
    let error = $state(null);

    let errorMsg = $state("");
    let forecast = $state<DailyForecast | null>(null) 

    let mapLon = $state(-87.63);
    let mapLat = $state(41.88);
    let searchedCity = $state('Chicago');

    let avgHigh = $derived(
        forecast
            ? Math.round(
                forecast.temperature_2m_max
                    .reduce((sum, t) => sum + t, 0)
                / forecast.temperature_2m_max.length
            )
            : null
    );

    $effect(
        () => {
            if (searchedCity) {localStorage.setItem("lastCity", searchedCity);}
        }
    );

    $effect(
        () => {
            const saved = localStorage.getItem("lastcity");
            if (saved) {
                city = saved;
            }
        }
    );

    const cities ={
        Chicago: {lat: 41.88, lon: -87.63},
        'New York': {lat: 40.71, lon: -74.01},
        London: {lat: 51.51, lon: -0.13},
        Tokyo: {lat: 35.68, lon: 139.69},
        Sydney: {lat: -33.87, lon: 151.21},
    };

    const weatherDescriptions = {
        0: 'Clear Sky',
        1: 'Mostly Clear',
        2: 'Partly Clear',
        3: 'Over Cast',
        45: 'Foggy',
        51: 'Drizzle',
        61: 'Rain',
        71: 'Snow',
        80: 'Showers',
        95: 'Thunderstorm',
    }

    async function searchCity() {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json()

        if (!geoData.results) { errorMsg = "City not found"; return; }
        const { latitude, longitude, name } = geoData.results[0];
        errorMsg = "";
        mapLon = longitude
        mapLat = latitude
        searchedCity = name
        

        const weatherURL = `https://api.open-meteo.com` +
        `/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&daily=temperature_2m_max,temperature_2m_min,` +
        `precipitation_probability_max` +
        `&current=temperature_2m` +
        `&temperature_unit=fahrenheit&timezone=auto`;

        const res = await fetch(weatherURL);
        const data = await res.json();
        weather = data;
        forecast = data.daily
        console.log(weatherURL)
    }

    // async function fetchWeather() {
    //     // loading = true;
    //     // error = null;
    //     // try {
    //     //     const baseURL = 'https://api.open-meteo.com'
    //     //     const apiPath = '/v1/forecast'
    //     //     const apiURL = new URL(apiPath, baseURL)
    //     //     const paramsMap = new Map()
    //     //     paramsMap
    //     //         .set('latitude', cities[city].lat)
    //     //         .set('longitude', cities[city].lon)
    //     //         .set('current', 'temperature_2m,weathercode,windspeed_10m')
    //     //         .set('temperature_unit', 'fahrenheit')
    //     //         .set('windspeed_unit', 'mph')
    //     //     const searchParams = new URLSearchParams(paramsMap)
    //     //     apiURL.search = searchParams.toString()
    //     //     const url = apiURL.toString()
    //     //     const response = await fetch(url)
    //     //     weather = await response.json()
    //     //     console.log(weather)
    //     // } catch (e) {
    //     //     error = 'Failed to fetch weather data';
    //     // }

    //     try {
    //         const { lat, lon } = cities[city];
    //         const url = `https://api.open-meteo.com/v1/forecast` +
    //             `?latitude=${lat}&longitude=${lon}` +
    //             `&current=temperature_2m,weathercode,windspeed_10m` +
    //             `&temperature_unit=fahrenheit&windspeed_unit=mph`;
            
    //         const response = await fetch(url);
    //         weather = await response.json(); 
    //         console.log(weather)
    //     } catch (e) {
    //         error = 'Failed to fetch weather data';
    //     }
    //     loading = false;
    // }
</script>

<h1 class="text-3xl font-bold mb-4">Weather</h1>

<!-- <div class="flex gap-3 mb-6">
    <select bind:value={city} class="p-2 border rounded">
        {#each Object.keys(cities) as c}
            <option>{c}</option>
        {/each}
    </select>
    <Button onclick={searchCity} variant='destructive'>Get Weather</Button>
</div> -->

{#if loading} <p class="text-gray-500">Loading...</p> {/if}
{#if error} <p class="text-red-600 font-bold">{error}</p> {/if}

<!-- {#if weather}
    <div class="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 class="text-xl font-bold mb-2">{city}</h2>
        <p class="text-4xl font-bold text-teal-700 mb-2">
            {weather.current.temperature_2m}°F</p>
        <p class="text-lg mb-1">
            {weatherDescriptions[weather.current.weathercode]
                ?? 'Unknown'}</p>
        <p class="text-gray-500">
            Wind: {weather.current.windspeed_10m} mph</p>
    </div>
{/if} -->

<div class='flex gap-2 mb-4'>
    <Input placeholder='Enter a city...' bind:value={city} />
     <Button onclick={searchCity}>Search</Button>
</div>

{#if weather}
    <!-- <div class='flex gap-2 mb-4'>
        <Input placeholder='Enter a city...' bind:value={city} />
        <Button onclick={searchCity}>Search</Button>
    </div> -->

    {#if errorMsg}
        <p class="text-red-500 mt-2">{errorMsg}</p>
    {/if}

    {#if !errorMsg}
        <p>{searchedCity}</p>
        <!-- <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Date</Table.Head>
                    <Table.Head>High</Table.Head>
                    <Table.Head>Low</Table.Head>
                    <Table.Head>Rain %</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if forecast}
                    {#each forecast.time as day, i}
                        <Table.Row>
                            <Table.Cell>{day}</Table.Cell>
                            <Table.Cell>{forecast.temperature_2m_max[i]} F</Table.Cell>
                            <Table.Cell>{forecast.temperature_2m_min[i]} F</Table.Cell>
                            <Table.Cell>{forecast.precipitation_probability_max[i]}%</Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root> -->

        <ForecastTable forecast={forecast} />



        <!-- <MapLibre
            center={[mapLon, mapLat]}
            zoom={10}
            class="h-[400px] w-full rounded-lg mt-4"
            style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        >
            <DefaultMarker lngLat={[mapLon, mapLat]} />
        </MapLibre> -->

        <WeatherMap lon={mapLon} lat={mapLat} cityName={searchedCity} />

        <Card.Root>
            <Card.Header>
                <Card.Title>{city}</Card.Title>
                <Card.Description>Current Conditions</Card.Description>
            </Card.Header>
            <Card.Content>
                <p class="text-4xl font-bold">
                    {weather.current.temperature_2m} F
                </p>
            </Card.Content>
        </Card.Root>

        {#if avgHigh !== null}
            <p class="text-lg font-semibold">
                7-day avg high: {avgHigh}F
            </p>
        {/if}

    {/if}
{/if}
