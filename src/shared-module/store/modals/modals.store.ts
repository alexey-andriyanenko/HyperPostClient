import { ModalsFactory } from "src/modals-module";
import { IModalsStoreRegistry, ModalName } from "./modals.store.types";

export const modalsStore = ModalsFactory.createStore<ModalName, IModalsStoreRegistry>();
