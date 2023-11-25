import { ModalsFactory } from "src/modals-module";

import { IModalProps, ModalsStoreRegistryGuard } from "src/modals-module";
import { ICreateDepartmentModalProps } from "src/departments-module/pages/departments/modals";

export type ModalName = "CreateDepartmentModal";

export interface IModalsStoreRegistry extends ModalsStoreRegistryGuard<ModalName> {
  CreateDepartmentModal: Omit<ICreateDepartmentModalProps, keyof IModalProps>;
}

export const modalsStore = ModalsFactory.createStore<ModalName, IModalsStoreRegistry>();
