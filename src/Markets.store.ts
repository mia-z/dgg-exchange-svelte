import { derived, writable } from "svelte/store";

type MarketsStore = Manifold.Market[]

const MarketsStore = () => {
    const { subscribe, set, update } = writable<MarketsStore>([]);

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
