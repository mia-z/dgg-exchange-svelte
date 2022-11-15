<script lang="ts">
    import { createChart, type IChartApi, type ISeriesApi, type Nominal } from "lightweight-charts";
    import { onMount } from "svelte";
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
    let seriesSets: SeriesSet = {};

    WatchingMarkets.subscribe(s => {
        for (const [_, { question, id }] of Object.entries(s)) {
            if (!seriesSets[id]) {
                seriesSets[id] = {
                    id: id,
                    question: question,
                    lineData: chart.addLineSeries({ title: question, color: stringToColour(id) })
                }
            }
        }
    });

    const updateTickers = (newData: Manifold.MarketFull[]) => {
        for (const [key, { question, id, lineData }] of Object.entries(seriesSets)) {
            const thisLinesData = newData.find(x => x.id === id);
            if (!thisLinesData) {
                console.log("got some data where a line didnt exist, removing");
                chart.removeSeries(seriesSets[id].lineData);
                delete seriesSets[id]
            } else {
                lineData.update({ time: Date.now() as  Nominal<number, "UTCTimestamp">, value: Math.trunc(thisLinesData.probability*100) })
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
                },
                horzLines: {
                    color: "#494949",
                },
            },
            layout: {
        		backgroundColor: "rgba(0,0,0,0)",
        		textColor: "#C9C9C9",
            },
            watermark: {

            }
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
</div>