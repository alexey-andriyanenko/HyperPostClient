export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: more details about ModalsStoreRegistryGuard
export type ModalsStoreRegistryGuard<ModalName extends string> = {
  [key in ModalName]?: unknown;
};

// TODO: more details about ModalsProviderRegistryGuard
export type ModalsProviderRegistryGuard<ModalName extends string> = {
  [key in ModalName]: unknown;
};
