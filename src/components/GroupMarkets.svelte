<script lang="ts">
	import { useQuery } from "@sveltestack/svelte-query";
	import Queries from "../lib/Queries";
	import MarketEntry from "./common/MarketEntry.svelte";

    export let marketsFilterString: string;
    export let group: Manifold.Group;
    
    const groupMarketsQuery = useQuery({
		queryFn: () => Queries.GetMarketsInGroupById(group.id),
		queryKey: ["group-market-" + group.id],
		refetchOnWindowFocus: false
	});
</script>

{#if $groupMarketsQuery.isLoading}
    fetching
{:else}
    {#each $groupMarketsQuery.data.filter(market => (marketsFilterString.length < 3) || (marketsFilterString.length > 2 && market.question.toLowerCase().includes(marketsFilterString.toLowerCase()))) as market}
        <MarketEntry {market} />
    {/each}
{/if}
