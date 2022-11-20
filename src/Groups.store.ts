import { derived, writable } from "svelte/store";
import { getStoredValue } from "./lib/Utils";

type GroupsStore = Manifold.Group[]

const GroupsStore = () => {
    const groupsCache = getStoredValue<Manifold.Group[]>("groupscache") || [];
    const { subscribe, set, update } = writable<GroupsStore>(groupsCache);

    const setGroups = (groups: Manifold.Group[]) => {
        set(groups);
    }

    const updateGroups = (groups: Manifold.Group[]) => {
        update((x) => { return [ ...x, ...groups ] });
    }

    return {
        subscribe,
        setGroups,
        updateGroups
    }
}

export const Groups = GroupsStore();

export const SortedGroups = derived(
    Groups,
    $GroupsStore => $GroupsStore.sort((a, b) => a.name.localeCompare(b.name))
);