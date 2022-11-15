<script lang="ts">
    import Marquee from "svelte-fast-marquee";
	import { Markets } from "../Markets.store";
</script>

<div class={"dot-matrix text-3xl select-none dark:text-white text-white bg-black rounded-lg mt-5 border-2 border-yellow-300"}>
    {#if $Markets.length < 1}
        <Marquee speed={50}>
            <div>------------------------------- Loading ------------------------------</div>
        </Marquee>
    {:else}
        <Marquee speed={5}>
            {#each $Markets as {question, probability}}
                <div>{question}(<span class={(probability*100) > 50 ? "text-emerald-600" : "text-red-600" }>{(probability*100).toFixed(0)}</span>%) -&nbsp;</div>
            {/each}
        </Marquee>
    {/if}
</div>