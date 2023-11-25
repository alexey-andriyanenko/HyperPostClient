import React from "react";
import { ModalsFactory, ModalsProviderRegistryGuard } from "src/modals-module";

import { modalsStore } from "src/packages-module/store/modals/modals.store";
import { ModalName, IModalsStoreRegistry } from "src/packages-module/store/modals";
import {
  IViewPackageModalProps,
  ViewPackageModal,
  TCreatePackageModalProps,
  CreatePackageModal,
} from "src/packages-module/pages/packages/modals";

interface IModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName> {
  ViewPackageModal: React.FC<IViewPackageModalProps>;
  CreatePackageModal: React.FC<TCreatePackageModalProps>;
}

const modalsRegistry: IModalsProviderRegistry = {
  ViewPackageModal,
  CreatePackageModal,
};

export const ModalsProvider = ModalsFactory.createProvider<
  ModalName,
  IModalsStoreRegistry,
  IModalsProviderRegistry
>(modalsStore, modalsRegistry);
