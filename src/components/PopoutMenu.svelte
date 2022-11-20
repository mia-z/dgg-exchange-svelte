<script lang="ts">
    import TabBar from "@smui/tab-bar";
    import Tab, { Label } from "@smui/tab";
	import MarketSelector from "./MarketSelector.svelte";
    import FavouriteMarkets from "./FavouriteMarkets.svelte"
	import TabbedContainer from "./common/TabbedContainer.svelte";

    let open: boolean = true;

    const toggleSidebar = () => {
        open = !open;
    }
    
    const views = {
        "Markets": MarketSelector,
        //"Favourites": FavouriteMarkets
    }

</script>

<div class={"popout-wrapper absolute bottom-0 left-0 w-screen select-none"}>
    <div on:click={toggleSidebar} on:keydown={() => {}} class={"cursor-pointer popout-open-button w-32 h-10 absolute left-[calc(50vw-4rem)] -top-10 bg-slate-600 rounded-t-lg"}>

    </div>
    <div on:click={toggleSidebar} on:keydown={() => {}} class={`popout-overlay absolute w-screen h-screen left-0 -top-[100vh] z-40 backdrop-blur-sm ${open ? "cursor-pointer " : "pointer-events-none opacity-0"} transition-opacity`}>
        <!-- This is the overlay when the bar is open -->
    </div>
    <div class={"fixed z-50"}>
        <div class={`pointer-events-none transition-transform absolute w-screen h-128 left-0 overflow-y-clip -top-128 z-50 translate-y-128 ${open ? "translate-y-0" : ""}`}>
            <TabbedContainer {views} />
        </div>
    </div>
</div>
 
 