import React from "react";
import { ModalsFactory, ModalsProviderRegistryGuard } from "src/modals-module";

import { IModalsStoreRegistry, ModalName } from "src/shared-module/store/modals";
import { IConfirmModalProps, ConfirmModal } from "src/shared-module/components/modals";
import { modalsStore } from "src/shared-module/store/modals/modals.store";

interface IModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName> {
  ConfirmModal: React.FC<IConfirmModalProps>;
}

const modalsProviderRegistry: IModalsProviderRegistry = {
  ConfirmModal,
};

export const ModalsProvider = ModalsFactory.createProvider<
  ModalName,
  IModalsStoreRegistry,
  IModalsProviderRegistry
>(modalsStore, modalsProviderRegistry);
