<script lang="ts">
	import Header from "./components/Header.svelte";
	import { DarkMode } from "./DarkMode.store";
    import Marquee from "./components/Marquee.svelte";
    import StockGraph from "./components/StockGraph.svelte";
	import PopoutMenu from "./components/PopoutMenu.svelte";
</script>

<main class={`${$DarkMode ? "dark" : ""}`}>
	<div class={"bg-[whitesmoke] transition-colors dark:bg-slate-800 dark:text-white min-h-screen flex flex-col"}>
		<Header />
		<div class={"sm:container mx-auto  flex flex-col"}>
			<Marquee />
			<div class={"h-100 min-h-[80vh] mx-3 mb-2 p-4 bg-white dark:bg-slate-900 grid grid-cols-7 rounded-b-lg shadow-md relative"}>
				<StockGraph />
            </div>
		</div>
		<PopoutMenu />
	</div>
</main>
