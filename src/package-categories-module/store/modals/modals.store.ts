import { ModalsFactory } from "src/modals-module";
import { IModalProps, ModalsStoreRegistryGuard } from "src/modals-module";

import { ICreatePackageCategoryModalProps } from "src/package-categories-module/pages/package-categories/modals";

export type ModalName = "CreatePackageCategoryModal";

export interface IModalsStoreRegistry extends ModalsStoreRegistryGuard<ModalName> {
  CreatePackageCategoryModal: Omit<ICreatePackageCategoryModalProps, keyof IModalProps>;
}

export const modalsStore = ModalsFactory.createStore<ModalName, IModalsStoreRegistry>();
