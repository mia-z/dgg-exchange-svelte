<script lang="ts">
    import { fly } from "svelte/transition";

    export let views: TabbedContainerViews = {};

    let currentView = Object.keys(views)[0];
</script>

<div class={"flex flex-col w-full h-full text-black"}>
    <div class={"flex flex-row w-full justify-center h-16 relative"}>
        {#each Object.keys(views) as viewLabel}
            <div on:click={() => views[viewLabel].enabled ? currentView = viewLabel : currentView = currentView} on:keydown={() => {}} data-tooltip-target={"tooltip-disabled-" + viewLabel} class={`select-none mx-5 text-text-black flex flex-row text-xl nunito font-bold my-auto cursor-pointer relative ${currentView === viewLabel ? "": ""} ${!views[viewLabel].enabled ? "cursor-pointer opacity-50" : ""}`}>
                <div class={"h-8"}>
                    <svelte:component this={views[viewLabel].icon} />
                </div>
                <div class={"ml-2 my-auto"}>
                    {viewLabel}
                </div>
                {#if viewLabel === currentView}
                    <div out:fly="{{ duration: 200, y: 10 }}" in:fly="{{ duration: 300, y: 10 }}" class={"absolute -bottom-1 w-2/3 mx-auto h-1 left-[calc(50%-33%)] bg-blue-400 rounded-lg"}>
                        &nbsp;
                    </div>
                {/if}
            </div>
            <div id={"tooltip-disabled-" + viewLabel} role="tooltip" class={` ${!views[viewLabel].enabled ? "inline-block absolute invisible z-50 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 dark:bg-gray-700" : "opacity-0 disabled"}  `}>
                {#if !views[viewLabel].enabled}
                    Unavailable
                    <div class="tooltip-arrow" data-popper-arrow></div>
                {/if}
                
            </div>
            
        {/each}

    </div>
    <div out:fly="{{ duration: 200, y: 10 }}" in:fly="{{ duration: 300, y: 10 }}" class={"w-full max-h-[calc(100%-4rem)] h-full p-2"}>
        <svelte:component  this={views[currentView].component} />
    </div>
</div>