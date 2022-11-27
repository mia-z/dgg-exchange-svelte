import { derived, writable } from "svelte/store";
import { getStoredValue } from "./lib/Utils";

type MarketsStore = Manifold.Market[]

const MarketsStore = () => {
    const groupsCache = getStoredValue<Manifold.Market[]>("defaultmarketscache") || [];
    const { subscribe, set, update } = writable<MarketsStore>(groupsCache);

    const setDggMarkets = (markets: Manifold.Market[]) => {
        set(markets);
    }

    const updateDggMarkets = (markets: Manifold.Market[]) => {
        update((x) => { return { ...x, dggMarkets: markets } });
    }

    return {
        subscribe,
        setDggMarkets,
        updateDggMarkets
    }
}

export const Markets = MarketsStore();

export const SortedMarkets = derived(
    Markets,
    $MarketsStore => $MarketsStore.sort((a, b) => a.question.localeCompare(b.question))  
);
