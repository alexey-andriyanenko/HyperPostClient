import React from "react";
import { ModalsFactory, ModalsProviderRegistryGuard } from "src/modals-module";

import { IModalsStoreRegistry, ModalName } from "src/departments-module/store/modals";
import {
  ICreateDepartmentModalProps,
  CreateDepartmentModal,
} from "src/departments-module/pages/departments/modals";
import { modalsStore } from "src/departments-module/store/modals/modals.store";

interface IModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName> {
  CreateDepartmentModal: React.FC<ICreateDepartmentModalProps>;
}

const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
};

export const ModalsProvider = ModalsFactory.createProvider<
  ModalName,
  IModalsStoreRegistry,
  IModalsProviderRegistry
>(modalsStore, modalsRegistry);
