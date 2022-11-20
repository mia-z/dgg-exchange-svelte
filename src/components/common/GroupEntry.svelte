<script lang="ts">
	import { useQuery } from "@sveltestack/svelte-query";
	import { Groups } from "../../Groups.store";
	import Queries from "../../lib/Queries";
    import { Users } from "../../Users.store"
    import IoIosStarOutline from "svelte-icons/io/IoIosStarOutline.svelte";
    import IoIosStar from "svelte-icons/io/IoIosStar.svelte";

    export let group: Manifold.Group;
    export let isSelected: boolean;
    export let toggleGroup: (group: Manifold.Group) => void;

    const imageQuery = useQuery({
		queryFn: () => Queries.GetUserById(group.creatorId),
		queryKey: ["user-image-" + group.id],
        onSuccess: (data) => {
            Users.addUserToCache(data);
        },
		refetchOnWindowFocus: false,
        enabled: $Users.find(x => x.id === group.creatorId) ? false : true
    });
</script>

<div class={`rounded-full bg-white text-black text-sm h-13 px-2 py-1 flex flex-row shadow-lg cursor-pointer hover:scale-105 transition-all active:scale-100 ${isSelected ? "bg-blue-300" : ""}`} on:click={() => toggleGroup(group)}  on:keydown={() => {}}>
    <div class={"w-1/6"}>
        {#if $imageQuery.isLoading}
            <div class={"animate-pulse"}>
                &nbsp;
            </div>
        {:else}
            <div class={"flex flex-col h-full"}>
                <img class={"my-auto -ml-1 rounded-full max-h-[42px] min-h-[42px]"} draggable="false" src={$Users.find(x => x.id === group.creatorId).avatarUrl} alt={"avatar"} />
            </div>
        {/if}
    </div>
    <div class={"w-2/3 flex flex-col"}>
        <div class={"truncate font-bold text-center h-1/2"}>
            {group.name}
        </div>
        <div class={"h-1/2 text-xs flex flex-row justify-around"}>
            <div class={"my-auto"}>
                Markets: <span class={"font-bold"}>{group.totalContracts}</span>
            </div>
            <div class={"my-auto"}>
                Members: <span class={"font-bold"}>{group.totalMembers}</span>
            </div>
        </div>
    </div>
    <div class={"w-1/6 flex flex-col"}>
        <div class={"h-2/3 my-auto text-yellow-500"}>
            <IoIosStarOutline />
        </div>
    </div>
</div>