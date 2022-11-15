<script lang="ts">
	import Header from "./components/Header.svelte";
	import { useQuery } from "@sveltestack/svelte-query";
	import { DarkMode } from "./DarkMode.store";
	import { Markets } from "./Markets.store";
	import Queries from "./lib/Queries";
    import Marquee from "./components/Marquee.svelte";
    import MarketsSelection from "./components/MarketsSelection.svelte";
    import StockGraph from "./components/StockGraph.svelte";
    import Footer from "./components/Footer.svelte";

	const DESTINYGG_GROUP_ID = "W2ES30fRo6CCbPNwMTTj";

	const queryResult = useQuery({
		queryFn: () => Queries.GetMarketsInGroupById(DESTINYGG_GROUP_ID),
		queryKey: ["groupMarkets", DESTINYGG_GROUP_ID],
		onSuccess: (result) => Markets.setDggMarkets(result),
		refetchOnWindowFocus: false
	});

	{$queryResult}
</script>

<main class={`${$DarkMode ? "dark" : ""}`}>
	<div class={"bg-[whitesmoke] transition-colors dark:bg-slate-800 dark:text-white min-h-screen flex flex-col"}>
		<Header />
		<div class={"sm:container mx-auto  flex flex-col"}>
			<Marquee />
			<div class={"h-100 mx-3 mb-2 p-4 bg-white dark:bg-slate-900 grid grid-cols-7 rounded-b-lg shadow-md"}>
                <MarketsSelection />
				<StockGraph />
            </div>
		</div>
		<Footer />
	</div>
</main>