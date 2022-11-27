<script lang="ts">
	import { useQuery } from "@sveltestack/svelte-query";
    import Marquee from "svelte-fast-marquee";
	import { writable } from "svelte/store";
	import Queries from "../lib/Queries";
	import { getStoredValue, setStoredValue } from "../lib/Utils";

    const DESTINYGG_GROUP_ID = "W2ES30fRo6CCbPNwMTTj";

    const marqueeStore = writable([]);

    const queryResult = useQuery({
        queryFn: () => Queries.GetMarqueePermanents(DESTINYGG_GROUP_ID),
        queryKey: ["marqueeCollection", DESTINYGG_GROUP_ID],
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const filteredResults = data.filter(m => (m.creatorUsername === "Cooley" || m.creatorUsername === "memestiny"));
            $marqueeStore = filteredResults;
            setStoredValue("marqueecache", filteredResults);
        }
    });

    const marqueeCache = getStoredValue<Manifold.Market[]>("marqueecache");
	if (marqueeCache) {
		marqueeStore.set(marqueeCache);
	}
</script>

<div class={"dot-matrix text-3xl select-none dark:text-white text-white bg-black rounded-lg mt-5 border-2 border-yellow-300"}>
    {#if $queryResult.isLoading && $marqueeStore.length < 1}
        <Marquee speed={50}>
            <div>------------------------------- Loading ------------------------------</div>
        </Marquee>
    {:else}
        <Marquee speed={5}>
            {#each $marqueeStore as {question, probability}}
                <div>{question}(<span class={(probability*100) > 50 ? "text-emerald-600" : "text-red-600" }>{(probability*100).toFixed(0)}</span>%) -&nbsp;</div>
            {/each}
        </Marquee>
    {/if}
</div>