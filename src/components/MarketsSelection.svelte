<script lang="ts">
    import { WatchingMarkets } from "../WatchingMarkets.store";
    import { SortedMarkets } from "../Markets.store";
    import Chip, { Set, Text } from "@smui/chips";
    import emotes from "../styles/emotes.json";
    import { getRandomIntInclusive } from "../lib/Utils";

    const emoteList: DggEmote[] = emotes;
    const randomEmote = emoteList.at(getRandomIntInclusive(0, emoteList.length));
    const randomPhrase = getRandomIntInclusive(0, 10) > 7 ? "P*PE wins" : "YEE wins";
</script>

<div class={"col-start-1 col-span-2 h-full overflow-y-scroll styled-scrollbars"}>
    {#if $SortedMarkets.length < 1}
        <div class={"flex flex-col h-full"}>
            <div class={"m-auto flex flex-col"}>
                <img src={randomEmote.image[0].url} height={randomEmote.image[0].height} width={randomEmote.image[0].width} alt={randomEmote.prefix} class={"animate-spin mx-auto"} />
                <div>{randomPhrase}</div>
            </div>
        </div>
        
    {:else}
        <Set class={"flex flex-row justify-center"} chips={$SortedMarkets} let:chip filter bind:selected={$WatchingMarkets}>
            <Chip class={"select-none"} {chip}>
                <Text>{chip.question}</Text>
            </Chip>
        </Set>
    {/if}
</div>