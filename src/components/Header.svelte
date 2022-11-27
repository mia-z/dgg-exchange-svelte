<script lang="ts">
    import { DarkMode } from "../DarkMode.store";
    import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
    import IoMdMoon from "svelte-icons/io/IoMdMoon.svelte";
</script>

<header class={"h-20 dark:bg-slate-700 shadow-lg"}>
    <div class={"grid grid-cols-5 grid-rows-1 h-full relative"}>
        <div class={"col-start-3 relative flex"}>
            <div class={"select-none relative text-4xl m-auto"}>
                <span class={"font-bold text-lightBlue-500"}>D</span>GG Exchange
            </div>
        </div>
        <div class={"col-start-5 relative flex"}>
            <div on:click={() => DarkMode.toggleMode()} on:keydown={() => {}} class={"my-auto mx-auto select-none switch-container cursor-pointer bg-white relative rounded-full top-0 left-0 h-9 w-16 flex flex-row p-1"}>
                <div class={`absolute top-[3px] left-1 h-4/5 w-1/2 rounded-full dark:bg-slate-800 bg-white shadow-inset-button transition-transform ${$DarkMode ? "translate-x-6" : ""}`}>
                    &nbsp;
                </div>
                <div class={"w-1/2 h-full text-slate-700"}>
                    <IoIosSunny />
                </div>
                <div class={"w-1/2 h-full text-amber-300"}>
                    <IoMdMoon />
                </div>
            </div>
        </div>
    </div>
</header>