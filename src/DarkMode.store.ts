import { writable } from "svelte/store";

const DarkModeStore = () => {
    const { subscribe, set, update } = writable(true);

    const toggleMode = () => {
        update(x => !x);
    }

    return {
        subscribe,
        toggleMode
    }
}

export const DarkMode = DarkModeStore();