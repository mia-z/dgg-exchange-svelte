<script lang="ts">
    import IoIosStats from "svelte-icons/io/IoIosStats.svelte";
    import IoMdCloseCircleOutline from "svelte-icons/io/IoMdCloseCircleOutline.svelte";
	import TabbedContainer from "./common/TabbedContainer.svelte";
	import OrbitersView from "./OrbitersView.svelte";
	import PollsView from "./PollsView.svelte";
    import IoMdPlanet from "svelte-icons/io/IoMdPlanet.svelte";
    import IoIosPodium from "svelte-icons/io/IoIosPodium.svelte";
    import FaDiscord from "svelte-icons/fa/FaDiscord.svelte";
	import DiscordLinkView from "./DiscordLinkView.svelte";
    import { WatchingMarkets } from "../WatchingMarkets.store";

    let open: boolean = false;

    const toggleOpen = () => {
        open = !open;
    }

    const views: TabbedContainerViews  = {
        "Orbiters": {
            component: OrbitersView,
            icon: IoMdPlanet,
            enabled: true
        },
        "Polls": {
            component: PollsView,
            icon: IoIosPodium,
            enabled: false
        },
        "Discord Link": {
            component: DiscordLinkView,
            icon: FaDiscord,
            enabled: false
        }

    }
</script>

<div class={`absolute flex flex-col transition-all rounded  ease-in ${open ? "open-overlay rounded-t-none z-20" : "close-overlay rounded-full"} bg-[whitesmoke]`}>
    <div on:click={toggleOpen} on:keydown={toggleOpen} class={`absolute top-2 text-red-300 hover:text-red-400 transition-all cursor-pointer right-2 h-8 w-8 ${open ? "z-50" : ""}`}>
        <IoMdCloseCircleOutline />
    </div>
    <TabbedContainer {views} />
</div>

<div on:click={toggleOpen} on:keydown={toggleOpen} class={`absolute flex flex-col transition-all bg-white ease-in ${open ? "button-open-overlay pointer-events-none" : "button-close-overlay hover:scale-110 cursor-pointer"} ${($WatchingMarkets.length < 1 && !open) ? "animate-zoom-in-out" : ""}`}>
    <div class={`p-1 h-10 w-10 mx-auto text-blue-400 `}>
        <IoIosStats />
    </div>
</div>

{#if $WatchingMarkets.length < 1}
    <div class={`nunito absolute bg-white text-text-black bottom-20 p-2 rounded shadow left-5`}>
        Press the button below to open the overlay and select markets to watch
    </div>
{/if}