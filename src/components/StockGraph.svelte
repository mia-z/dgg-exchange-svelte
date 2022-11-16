<script lang="ts">
    import { createChart, PriceScaleMode, type IChartApi, type ISeriesApi, type Nominal } from "lightweight-charts";
    import { onMount, onDestroy } from "svelte";
    import Queries from "../lib/Queries";
    import { useQuery } from "@sveltestack/svelte-query";
    import { WatchingMarketsSimple, WatchingMarkets } from "../WatchingMarkets.store";
    import { stringToColour } from "../lib/Utils";

    let observer;
    let chartElement;
    let width = 600;
    let height = 600;
    
    const queryHandler = useQuery(["marketsToFetch", $WatchingMarketsSimple], {
        queryFn: () => Queries.GetMarketsById($WatchingMarketsSimple.map(x => x.id)),
        onSuccess: (data) => {
            updateTickers(data);
        },
        refetchInterval: 500,
    });

    let chart: IChartApi;

    let smoothTimeIncrementer: ISeriesApi<"Line">;
    let seriesSets: SeriesSet = {};

    WatchingMarkets.subscribe(s => {
        for (const [_, { question, id, probability }] of Object.entries(s)) {
            if (!seriesSets[id]) {
                seriesSets[id] = {
                    id: id,
                    question: question,
                    lineData: chart.addLineSeries({ title: question, color: stringToColour(id), autoscaleInfoProvider: () => ({
                        priceRange: {
                            minValue: 10,
                            maxValue: 83
                            }
                        }) 
                    }),
                    lastFetchedValue: probability*100,
                    currentValue: probability*100
                }
            }
        }
    });

    const updateTickers = (newData: Manifold.MarketFull[]) => {
        for (let [key, { question, id, lineData, lastFetchedValue, currentValue }] of Object.entries(seriesSets)) {
            const thisLinesData = newData.find(x => x.id === id);
            if (!thisLinesData) {
                console.log("got some data where a line didnt exist, removing");
                chart.removeSeries(seriesSets[id].lineData);
                delete seriesSets[id]
            } else {
                clearInterval(seriesSets[id].tweener);
                seriesSets[id].lastFetchedValue = thisLinesData.probability*100;

                seriesSets[id].tweener = setInterval(() => {
                    console.log("poller", seriesSets[id].currentValue, seriesSets[id].lastFetchedValue, thisLinesData.probability*100)

                    if (seriesSets[id].currentValue < seriesSets[id].lastFetchedValue) {
                        seriesSets[id].currentValue += 0.11;
                        if (seriesSets[id].currentValue >= seriesSets[id].lastFetchedValue) {
                            seriesSets[id].currentValue = seriesSets[id].lastFetchedValue;
                        }
                    }

                    if (seriesSets[id].currentValue > seriesSets[id].lastFetchedValue) {
                        seriesSets[id].currentValue -= 0.1;
                        if (seriesSets[id].currentValue <= seriesSets[id].lastFetchedValue) {
                            seriesSets[id].currentValue = seriesSets[id].lastFetchedValue;
                        }
                    }

                    lineData.update({ time: Date.now() as Nominal<number, "UTCTimestamp">, value: seriesSets[id].currentValue });
                }, 50)
            }
        }
    }

    onMount(() => {
        chart = createChart(document.getElementById("chart-box"), {
            width, 
            height,
            timeScale: {
                visible: false
            },
            grid: {
                vertLines: {
                    color: "#494949",
                    visible: false
                },
                horzLines: {
                    color: "#494949",
                    visible: false
                },
            },
            layout: {
        		backgroundColor: "rgba(0,0,0,0)",
        		textColor: "#C9C9C9",
            },
            watermark: {

            }
        });
        smoothTimeIncrementer = chart.addLineSeries({
            visible: false,
            
        });

        observer = new ResizeObserver(([entry]) => {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
            chart.applyOptions({ width, height });
        });
        observer.observe(chartElement);
    });

    {$queryHandler}
</script>

<div class={"ml-2 col-span-5 flex flex-col h-100 relative"}>
    <img src="https://cdn.destiny.gg/img/dgg-logo.svg" class={"absolute top-[calc(50%-5rem)] left-[calc(50%-10rem)] w-[20rem] opacity-30"} alt="destiny logo" />
    <div id={"chart-box"} class={"h-full"} bind:this={chartElement}>
        <!-- The graph goes in here! -->
    </div>
    <!-- <button class={"absolute left-30 -bottom-20 h-10 w-20 bg-red-500"}>ADD</button> -->
</div>
