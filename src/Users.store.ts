import { derived, writable } from "svelte/store";
import { getStoredValue, updateStoredValue } from "./lib/Utils";

type LiteUser = Pick<Manifold.User, "avatarUrl" | "id">;
type UsersStore = LiteUser[]

const UsersStore = () => {
    const cacheGet = getStoredValue<Manifold.User[]>("userscache") || [];
    const { subscribe, set, update } = writable<UsersStore>(cacheGet);

    const setUsers = (users: Manifold.User[]) => {
        set(users);
    }

    const addUserToCache = (user: Pick<Manifold.User, "avatarUrl" | "id">) => {
        update((x) => { 
            const updatedUsers = [ ...x, user ]
            localStorage.setItem("userscache", JSON.stringify(updatedUsers));
            return updatedUsers;
        });
    }

    return {
        subscribe,
        setUsers,
        addUserToCache
    }
}

export const Users = UsersStore();