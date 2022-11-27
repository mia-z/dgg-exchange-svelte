import { derived, writable } from "svelte/store";
import { toast } from "@zerodevx/svelte-toast";

type MarketsStore = Manifold.Market[];

const theme = {
    "--toastColor": "mintcream",
    "--toastBackground": "rgba(72,187,120,0.9)",
    "--toastBarBackground": "#2F855A"
}

const WatchingMarketsStore = () => {
    const { subscribe, set, update } = writable<MarketsStore>([]);

    const addMarketToWatch = (market: Manifold.Market) => {
        update((x) => [ ...x, market ]);
    }

    const removeMarketToWatch = (market: Manifold.Market) => {
        update((x) => x.filter(m => m.id !== market.id));
    }

    const toggleMarketToWatch = (market: Manifold.Market) => {
        update((x) => {
            if (x.some(m => m.id === market.id)) {
                toast.push("Stopped watching " + market.question)
                return x.filter(m => m.id !== market.id);
            } else {
                toast.push("Watching " + market.question)
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