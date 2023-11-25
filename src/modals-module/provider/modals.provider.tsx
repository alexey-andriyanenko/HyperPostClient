import React from "react";

import { ModalsStore } from "../store";
import {
  ModalsProviderRegistryGuard,
  ModalsStoreRegistryGuard,
} from "src/modals-module/modals.types";
import { observer } from "mobx-react-lite";

export interface IModalsProviderProps<ModalName extends string> {
  store: ModalsStore<ModalName, ModalsStoreRegistryGuard<ModalName>>;
  providerRegistry: ModalsProviderRegistryGuard<ModalName>;
}

export const ModalsProvider = observer(
  <ModalName extends string>({ store, providerRegistry }: IModalsProviderProps<ModalName>) => {
    return (
      <>
        {Object.entries(store.registry).map(([name, props]) => {
          const ModalComponent = providerRegistry[name as ModalName] as React.FC;

          return (
            <ModalComponent
              key={name}
              {...(props as any)}
              isOpen
              onClose={() => store.close(name as ModalName)}
            />
          );
        })}
      </>
    );
  },
);
