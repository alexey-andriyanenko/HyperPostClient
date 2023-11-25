import React from "react";
import { ModalsFactory, ModalsProviderRegistryGuard } from "src/modals-module";

import { ModalName, IModalsStoreRegistry } from "src/package-categories-module/store/modals";
import { modalsStore } from "src/package-categories-module/store/modals/modals.store";

import {
  CreatePackageCategoryModal,
  ICreatePackageCategoryModalProps,
} from "src/package-categories-module/pages/package-categories/modals";

interface IModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName> {
  CreatePackageCategoryModal: React.FC<ICreatePackageCategoryModalProps>;
}

const modalsRegistry: IModalsProviderRegistry = {
  CreatePackageCategoryModal,
};

export const ModalsProvider = ModalsFactory.createProvider<
  ModalName,
  IModalsStoreRegistry,
  IModalsProviderRegistry
>(modalsStore, modalsRegistry);
