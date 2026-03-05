<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";

    type DailyForecast = {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_probability_max: number[];
    };

    let {forecast} = $props<{forecast: DailyForecast | null;}>()
</script>

<Table.Root>
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
        </Table.Root>