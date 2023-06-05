import { rootStore } from "./root.store";
import { TStoreName } from "./root.store.types";

export const useStore = (name: TStoreName) => rootStore.getStore(name);
