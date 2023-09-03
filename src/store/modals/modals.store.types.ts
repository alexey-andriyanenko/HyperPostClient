import { ICreateDepartmentModalProps } from "src/pages/departments/modals";
import { ICreatePackageCategoryModal } from "src/pages/package-categories/modals";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ModalName = "CreateDepartmentModal" | "CreatePackageCategoryModal";

export type ModalRegistryGuard = {
  [key in ModalName]?: unknown;
};

// if i try to create another type to automatically remove IModalProps
// it will not work and will behave like 'any' :/
export interface IModalRegistry extends ModalRegistryGuard {
  CreateDepartmentModal?: Omit<ICreateDepartmentModalProps, keyof IModalProps>;
  CreatePackageCategoryModal?: Omit<ICreatePackageCategoryModal, keyof IModalProps>;
}
