<script lang="ts">
	import { useQuery } from "@sveltestack/svelte-query";
	import Queries from "../lib/Queries";
	import { Groups, SortedGroups } from "../Groups.store";
	import { getStoredValue, setStoredValue } from "../lib/Utils";
	import GroupEntry from "./common/GroupEntry.svelte";
	import IoMdSearch from "svelte-icons/io/IoMdSearch.svelte";
	import GroupMarkets from "./GroupMarkets.svelte";


	$: marketsFilterString = "";
	$: groupFilterString = "";
	$: selectedGroups = [];

	const toggleGroup = (group: Manifold.Group) => {
		if (selectedGroups.some(x => x.id === group.id)) {
			selectedGroups = selectedGroups.filter(x => x.id !== group.id);
		} else {
			selectedGroups = [ ...selectedGroups, group ];
		}
	}

	const groupsQuery = useQuery({
		queryFn: () => Queries.GetAllGroups(),
		queryKey: ["groups"],
		onSuccess: (result) => {
			Groups.setGroups(result);
			setStoredValue("groupscache", result);
		},
		refetchOnWindowFocus: false
	});

</script>

<div class={"grid grid-cols-12 gap-x-2"}>
	<div class={"col-span-4 flex flex-col"}>
		<div class={"h-16 py-2 px-3 flex flex-row"}>
			<div class={"input-wrapper relative w-full"}>
				<input bind:value={groupFilterString} type="text" placeholder={"Type here to filter groups"} class={"absolute text-center top-0 left-0 w-full h-full rounded-full z-10 outline-none text-black px-5 text-xl blue-under-shadow-with-focus transition-shadow focus:transition-shadow focus:duration-300 duration-300"} />
				<div class={"absolute z-20 w-10 top-1 right-1 rounded-full bg-lightBlue-400 cursor-pointer hover:scale-110 transition-all p-1"}>
					<IoMdSearch />
				</div>
			</div>
		</div>
		<div class={"grid grid-cols-2 pl-3 auto-rows-max gap-2 grid-flow-row-dense styled-scrollbars overflow-x-hidden overflow-y-scroll h-96 p-1"}>
			{#if $groupsQuery.isLoading && $Groups.length < 1}
				loading
			{:else}
				{#each $SortedGroups.filter(group => (groupFilterString.length < 3) || (groupFilterString.length > 2 && group.name.toLowerCase().includes(groupFilterString.toLowerCase()))) as group}
					<GroupEntry toggleGroup={() => toggleGroup(group)} isSelected={selectedGroups.some(x => x.id === group.id)} {group} />
				{/each}
			{/if}
		</div>
	</div>
	<div class={"col-span-8 bg-slate-900 rounded-2xl"}>
		<div class={"grid grid-cols-3 grid-flow-row auto-rows-max gap-2 p-2"}>
			<div class={"h-16 px-3 flex flex-row my-auto"}>
				<div class={"h-10 input-wrapper relative w-full"}>
					<input bind:value={marketsFilterString} type="text" placeholder={"Type here to filter markets"} class={"absolute text-center top-0 left-0 w-full h-full rounded-full z-10 outline-none text-black px-5 text-xl blue-under-shadow-with-focus transition-shadow focus:transition-shadow focus:duration-300 duration-300"} />
					<div class={"absolute z-20 w-8 top-1 right-1 rounded-full bg-lightBlue-400 cursor-pointer hover:scale-110 transition-all p-1"}>
						<IoMdSearch />
					</div>
				</div>
			</div>
			{#if selectedGroups.length < 1}
				<div class={"row-start-2"}>
					select a group
				</div>
			{:else}
				{#each selectedGroups as group}
					<GroupMarkets {group} {marketsFilterString} />
				{/each}
			{/if}
		</div>
	</div>
</div>