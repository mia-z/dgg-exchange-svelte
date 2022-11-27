import { derived, writable } from "svelte/store";
import { getStoredValue, setStoredValue, updateStoredValue } from "./lib/Utils";

type SelectedGroupsStore = Manifold.Group[]

const SelectedGroupsStore = () => {
    const groupsCache = getStoredValue<Manifold.Group[]>("selectedgroupscache") || [];
    const { subscribe, set, update } = writable<SelectedGroupsStore>(groupsCache);

    const setGroups = (groups: Manifold.Group[]) => {
        set(groups);
    }

    const updateGroups = (newGroup: Manifold.Group) => {
        update((x) => { 
            if (x.some(g => g.id === newGroup.id)) {
                const removedGroupArray = x.filter(g => g.id !== newGroup.id);
                setStoredValue("selectedgroupscache", removedGroupArray);
                return removedGroupArray;
            } else {
                updateStoredValue("selectedgroupscache", [newGroup]);
                return [ ...x, newGroup ] 
            }
        });
    }

    return {
        subscribe,
        setGroups,
        updateGroups
    }
}

export const SelectedGroups = SelectedGroupsStore();
