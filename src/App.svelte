<script lang="ts">
	import "flowbite/dist/flowbite.css";
	import Header from "./components/Header.svelte";
	import { DarkMode } from "./DarkMode.store";
	import { SvelteToast } from "@zerodevx/svelte-toast";
    import Marquee from "./components/Marquee.svelte";
    import StockGraph from "./components/StockGraph.svelte";
	import GraphOverlay from "./components/GraphOverlay.svelte";

	const options = {
	}

	setTimeout(() => {
		document.getElementById("main").classList.remove("preload");
	}, 500);
</script>

<main id={"main"} class={`${$DarkMode ? "dark" : ""} preload`}>
	<div class={"bg-[whitesmoke] transition-colors dark:bg-slate-800 dark:text-white min-h-screen flex flex-col"}>
		<Header />
		<div class={"sm:container mx-auto flex flex-col"}>
			<Marquee />
			<div class={"h-100 min-h-[80vh] mx-3 mb-2 p-4 bg-white dark:bg-slate-900 grid grid-cols-7 rounded-b-lg shadow-md relative"}>
				<StockGraph />
				<GraphOverlay />
            </div>
		</div>
	</div>
	<SvelteToast {options} />
</main>

<style>
	:root {
	  --toastContainerTop: auto;
	  --toastContainerBottom: 4rem;
	}
</style>