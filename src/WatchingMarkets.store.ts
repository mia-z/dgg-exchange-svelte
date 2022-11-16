import { derived, writable } from "svelte/store";

type MarketsStore = Manifold.MarketFull[];

const WatchingMarketsStore = () => {
    const { subscribe, set, update } = writable<MarketsStore>([]);

    const addMarketToWatch = (market: Manifold.MarketFull) => {
        update((x) => [ ...x, market ]);
    }

    const removeMarketToWatch = (market: Manifold.MarketFull) => {
        update((x) => x.filter(m => m.id !== market.id));
    }

    const toggleMarketToWatch = (market: Manifold.MarketFull) => {
        update((x) => {
            if (x.some(m => m.id === market.id)) {
                return x.filter(m => m.id !== market.id);
            } else {
                return [ ...x, market ];
            }
        });
    }

    return {
        subscribe,
        set,
        addMarketToWatch,
        removeMarketToWatch,
        toggleMarketToWatch
    }
}

export const WatchingMarkets = WatchingMarketsStore();

export const WatchingMarketsSimple = derived(
    WatchingMarkets,
    $WatchingMarketsStore => $WatchingMarketsStore.map(x => { return { question: x.question, id: x.id } })
);