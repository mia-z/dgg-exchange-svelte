import { writable } from "svelte/store";
import { getStoredValue, setStoredValue, updateStoredValue } from "./lib/Utils";

type SlugsStore = string[]

const SlugsStore = () => {
    let slugsCache = getStoredValue<string[]>("slugscache") || [];
    if (slugsCache.length < 1) {
        slugsCache = ["destinygg"];
        setStoredValue("slugscache", slugsCache);
    }
    const { subscribe, set, update } = writable<string[]>(slugsCache);

    const setSlugs = (slugs: string[]) => {
        set(slugs);
    }

    const updateSlugs = (newSlug: string) => {
        update((x) => { 
            if (x.some(s => s === newSlug)) {
                const removedGroupArray = x.filter(s => s !== newSlug);
                setStoredValue("slugscache", removedGroupArray);
                return removedGroupArray;
            } else {
                updateStoredValue("slugscache", [newSlug]);
                return [ ...x, newSlug ] 
            }
        });
    }

    const removeSlug = (slugToDelete: string) => {
        update((x) => {
            const removedGroupArray = x.filter(s => s !== slugToDelete);
            setStoredValue("slugscache", removedGroupArray);
            return removedGroupArray;
        });
    }

    return {
        subscribe,
        setSlugs,
        updateSlugs,
        removeSlug
    }
}

export const Slugs = SlugsStore();
