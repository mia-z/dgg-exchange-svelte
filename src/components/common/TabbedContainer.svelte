<script lang="ts">
    export let views: TabbedContainerViews;
    
    let active = Object.keys(views)[0];
</script>

<div class={"tab-container flex flex-col h-full work-sans"}>
    <div class={"tabs flex flex-row p-1 space-x-1"}>
        {#each Object.keys(views) as viewTitle}
            <div on:click={() => active = viewTitle} on:keydown={() => {}} class={`pointer-events-auto tab-label font-bold ${active === viewTitle ? "bg-slate-700" : "bg-slate-800"} rounded-xl rounded-b-none px-5 py-3 cursor-pointer hover:brightness-125 active:brightness-95 transition-all`}>
                {viewTitle}
            </div>
        {/each}
    </div>
    <div class={"tab-content bg-slate-700 -mt-1 h-full p-2 pointer-events-auto"}>
        <svelte:component this={views[active]} />
    </div>
</div>