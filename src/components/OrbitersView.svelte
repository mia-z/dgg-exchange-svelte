<script lang="ts">
	import { useQuery } from "@sveltestack/svelte-query";
	import { Circle } from "svelte-loading-spinners";
	import Queries from "../lib/Queries";
    import { WatchingMarkets } from "../WatchingMarkets.store";

    const groupQuery = useQuery({
        queryFn: () => Queries.GetMarketsInGroupById("W2ES30fRo6CCbPNwMTTj"),
        queryKey: ["group", "W2ES30fRo6CCbPNwMTTj"],
        refetchOnWindowFocus: false,
        onSuccess: (data: Manifold.Market[]) => {
            console.log(data);
            //Groups.updateGroups(data);
        }
    });

    const trustedUsers = ["Cooley", "memestiny"]

    $: selectedUsers = ["Cooley", "memestiny"]

    $: usersMap = (input: Manifold.Market[]) => {
        return new Map(
            input
                .filter(x => !selectedUsers.some(su => su === x.creatorUsername))
                .sort((a, b) => a.creatorUsername.localeCompare(b.creatorUsername))
                .map(x => {
                return [x.creatorUsername, x.creatorAvatarUrl]
            }
        ));
    }

    $: toggleUserSource = (newSource: string) => {
        if (selectedUsers.some(x => x === newSource)) {
            selectedUsers = selectedUsers.filter(x => x !== newSource);
        } else {
            selectedUsers = [ ...selectedUsers, newSource ];
        }
    }

    $: marketsByUser = (input: Manifold.Market[]) => {
        const m = input
            .filter(x => selectedUsers.includes(x.creatorUsername) && x.question.toLowerCase().includes("permanent"))
            .map(x => {
                return {
                    ...x,
                    question: x.question.replaceAll(/([\(\[])?([Pp]ermanent)([\)\]])?(([\s]?[Ss]tock([s])?)$[\s]?)$|(([\s]?[Ss]tock([s])?)$[\s]?)$|([\s]?[Ss]tock[s]?)?[\s]?([\(\[])?([Pp]ermanent)([\)\]])?/ig, "")
                }
            })
            .sort((a, b) => a.question.localeCompare(b.question));
        return m;
    }

</script>

<div class={"relative x-50 grid grid-cols-3 gap-x-5 grid-rows-1 h-full select-none"}>
    <div class={"flex flex-col"}>
        <div class={"nunito w-full font-bold text-center text-xl text-text-black"}>
            Sources
        </div>
        <br />
        <div class={"flex flex-col bg-white min-h-[8rem] justify-center p-3 rounded shadow-md relative"}>
            {#if selectedUsers.length > 0}
                <div class={`text-center text-xl text-text-black mb-3`}>
                    Selected Sources
                </div>
                <div class={`flex flex-row flex-wrap justify-center space-x-2`}>
                    {#each selectedUsers as user}
                        <div on:click={() => toggleUserSource(user)} on:keydown={() => toggleUserSource(user)} class={`rounded border px-2 mb-2 shadow nunito select-none cursor-pointer active:translate-y-0.5 active:translate-x-0.5 transition-all`}>
                            {#if trustedUsers.includes(user)}
                                {user} (<span class={"text-emerald-500 font-bold"}>trusted</span>)
                            {:else}
                                {user}
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
            {#if $groupQuery.isLoading}
                <div class={`absolute top-0 left-0 w-full rounded h-full bg-black opacity-60`}>
                    <div class={"absolute top-[calc(50%-1.5rem)] left-[calc(50%-1.5rem)]"}>
                        <Circle size="3" unit="rem" color="#60A5FA" />
                    </div>
                </div>
            {:else}
                <hr class={`my-2`} />
                <div class={`text-center text-xl text-text-black mb-3`}>
                    Available sources
                </div>
                <div class={`flex flex-row flex-wrap justify-center space-x-2 overflow-y-scroll styled-scrollbars`}>
                    {#each [...usersMap($groupQuery.data)] as [username, avatarUrl]}
                        <div on:click={() => toggleUserSource(username)} on:keydown={() => toggleUserSource(username)}  class={`rounded border px-2 mb-2 shadow nunito select-none cursor-pointer active:translate-y-0.5 active:translate-x-0.5 transition-all`}>
                            {#if trustedUsers.includes(username)}
                                {username} (<span class={"text-emerald-400 font-bold"}>trusted</span>)                            
                            {:else}
                                {username}
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class={"flex flex-col col-span-2"}>
        <div class={"nunito w-full font-bold text-center text-xl text-text-black"}>
            Markets
        </div>
        <br />
        <div class={"flex flex-col bg-white min-h-[8rem] justify-center p-3 rounded shadow-md relative"}>
            {#if selectedUsers.length < 1}
                <div class={`text-center text-xl text-text-black mb-3`}>
                    Select at least one source from the Sources column
                </div>
            {:else if $groupQuery.isLoading}
                <div class={`absolute top-0 left-0 w-full rounded h-full bg-black opacity-60`}>
                    <div class={"absolute top-[calc(50%-1.5rem)] left-[calc(50%-1.5rem)]"}>
                        <Circle size="3" unit="rem" color="#60A5FA" />
                    </div>
                </div>
            {:else}
                <div class={`text-center text-xl text-text-black mb-3`}>
                    Available Markets
                </div>
                <div class={`flex flex-row flex-wrap justify-center space-x-2 overflow-y-scroll styled-scrollbars`}>
                    {#each marketsByUser($groupQuery.data) as market}
                        <div on:click={() => WatchingMarkets.toggleMarketToWatch(market)} on:keydown={() => WatchingMarkets.toggleMarketToWatch(market)} class={`rounded border px-2 mb-2 shadow nunito select-none cursor-pointer active:translate-y-0.5 active:translate-x-0.5 transition-all ${$WatchingMarkets.some(x => x.id === market.id) ? "bg-blue-400 text-white" : ""}`}>
                            {market.question}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>