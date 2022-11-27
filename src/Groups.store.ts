import { derived, writable } from "svelte/store";
import { getStoredValue, setStoredValue, updateStoredValue } from "./lib/Utils";

type GroupsStore = Manifold.Group[]

const GroupsStore = () => {
    let groupsCache = getStoredValue<Manifold.Group[]>("groupscache") || [];
    const { subscribe, set, update } = writable<GroupsStore>(groupsCache);

    const setGroups = (groups: Manifold.Group[]) => {
        set(groups);
    }

    const updateGroups = (newGroup: Manifold.Group) => {
        update((x) => { 
            if (!x.some(g => g.id === newGroup.id)) {
                updateStoredValue("groupscache", [newGroup]);
                return [ ...x, newGroup ];
            }
        });
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