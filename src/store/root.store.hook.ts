import { rootStore } from "./root.store";
import { IRootStores } from "./root.store.types";

export const useStore = <T extends keyof IRootStores>(name: T) => rootStore.getStore<T>(name);
