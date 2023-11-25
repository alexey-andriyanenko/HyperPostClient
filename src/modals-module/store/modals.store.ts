import { makeAutoObservable } from "mobx";

import { eventBus } from "src/event-bus";

import { ModalsStoreRegistryGuard } from "src/modals-module/modals.types";

export class ModalsStore<
  ModalName extends string,
  ModalsRegistry extends ModalsStoreRegistryGuard<ModalName>,
> {
  private _registry: ModalsRegistry = {} as ModalsRegistry;

  constructor() {
    makeAutoObservable(this);
    eventBus.on("logout", this._clear.bind(this));
  }

  public get registry(): ModalsRegistry {
    return this._registry;
  }

  public open<T extends ModalName>(name: T, props: ModalsRegistry[T]) {
    this._registry[name] = props;
  }

  public close(name: ModalName) {
    delete this._registry[name];
  }

  private _clear() {
    for (const key in this._registry) {
      this.close(key as unknown as ModalName);
    }
  }
}
