<script lang="ts">
    import { WatchingMarkets, WatchingMarketsSimple } from "../../WatchingMarkets.store"
    import IoIosStarOutline from "svelte-icons/io/IoIosStarOutline.svelte";
    import IoIosStar from "svelte-icons/io/IoIosStar.svelte";

    export let market: Manifold.Market;

    const formattedPct = Math.trunc(market.probability*100);
    const isPositive = formattedPct < 50 ? true : false;
</script>

<div on:click={() => { WatchingMarkets.toggleMarketToWatch(market) }} on:keydown={() => {}} class={`col-span-1 flex flex-row bg-[whitesmoke] h-16 rounded-full px-3 hover:scale-105 active:scale-100 transition-all cursor-pointer ${$WatchingMarketsSimple.some(x => x.id === market.id) ? " bg-blue-400" : ""}`}>
    <div class={`w-1/6 my-auto font-bold text-2xl ${isPositive ? "text-red-400" : "text-emerald-400"}`}>
        {formattedPct}%
    </div>
    <div class={"flex flex-col w-2/3"}>
        <div class={"font-bold text-black text-ellipsise text-sm h-full line-clamp-2"}>
            {market.question}
        </div>
    </div>
    <div class={"w-1/6 flex flex-col"}>
        <div class={"h-3/6 my-auto text-yellow-500"}>
            <IoIosStarOutline />
        </div>
    </div>
</div>