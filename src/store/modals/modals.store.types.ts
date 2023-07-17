import { TCreateDepartmentModalProps } from "src/pages/departments/modals";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ModalName = "CreateDepartmentModal";

export type ModalRegistryGuard = {
  [key in ModalName]?: unknown;
};

// if i try to create another type to automatically remove IModalProps
// it will not work and will behave like 'any' :/
export interface IModalRegistry extends ModalRegistryGuard {
  CreateDepartmentModal?: Omit<TCreateDepartmentModalProps, keyof IModalProps>;
}
