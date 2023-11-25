import { IModalProps, ModalsFactory, ModalsStoreRegistryGuard } from "src/modals-module";

import {
  IViewPackageModalProps,
  TCreatePackageModalProps,
} from "src/packages-module/pages/packages/modals";

export type ModalName = "ViewPackageModal" | "CreatePackageModal";

export interface IModalsStoreRegistry extends ModalsStoreRegistryGuard<ModalName> {
  ViewPackageModal: Omit<IViewPackageModalProps, keyof IModalProps>;
  CreatePackageModal: Omit<TCreatePackageModalProps, keyof IModalProps>;
}

export const modalsStore = ModalsFactory.createStore<ModalName, IModalsStoreRegistry>();
