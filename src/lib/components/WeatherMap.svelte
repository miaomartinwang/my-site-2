<script lang='ts'>
	// import { stringify } from 'querystring';
    import {MapLibre, DefaultMarker} from 'svelte-maplibre';

    let {lon, lat, cityName} = $props<{
        lon: Number;
        lat: Number;
        cityName: string;
    }>();
</script>

<MapLibre center={[lon, lat]} zoom={10} class="h-[400px] w-full rounded-lg mt-4" style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
    <DefaultMarker lngLat={[lon,lat]} />
</MapLibre>