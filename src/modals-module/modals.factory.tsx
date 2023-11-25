import React from "react";
import { ModalsStore } from "./store";
import { ModalsProvider } from "./provider";
import {
  ModalsProviderRegistryGuard,
  ModalsStoreRegistryGuard,
} from "src/modals-module/modals.types";

export class ModalsFactory {
  public static createStore<
    ModalName extends string,
    ModalsRegistry extends ModalsStoreRegistryGuard<ModalName>,
  >() {
    return new ModalsStore<ModalName, ModalsRegistry>();
  }

  public static createProvider<
    ModalName extends string,
    ModalsStoreRegistry extends ModalsStoreRegistryGuard<ModalName>,
    ModalsProviderRegistry extends ModalsProviderRegistryGuard<ModalName>,
  >(store: ModalsStore<ModalName, ModalsStoreRegistry>, providerRegistry: ModalsProviderRegistry) {
    return () => <ModalsProvider<ModalName> store={store} providerRegistry={providerRegistry} />;
  }
}
