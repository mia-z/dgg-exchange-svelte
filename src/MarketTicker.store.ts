import type { Nominal, Time } from "lightweight-charts";
import { writable } from "svelte/store";

type TickerData = {
    tickerName: string,
    id: string,
    dataset: {
        value: string,
        time: Time
    }[]
}

type TickerDataSet = {
    [key: string]: TickerData
}

const MarketTickerStore = () => {
    const { set, update, subscribe } = writable<TickerDataSet>({});

    const updateMarkets = (markets: Manifold.MarketFull[]) => {
        update(x => {
            for (let market of markets) {
                if (!x[market.id]) {
                    x[market.id] = {
                        tickerName: market.question,
                        id: market.id,
                        dataset: [ { time: Date.now()  as Nominal<number, "UTCTimestamp">, value: (market.probability*100).toFixed(0) } ]
                    }
                } else {
                    x[market.id].dataset.push({ time: Date.now() as Nominal<number, "UTCTimestamp">, value: (market.probability*100).toFixed(0) });
                }
            }
            console.log(x);
            return x;
        });
    }

    return {
        subscribe,
        set,
        update,
        updateMarkets
    }
};

export const MarketTicker = MarketTickerStore();