import { ICreateDepartmentModalProps } from "src/pages/departments/modals";
import { ICreatePackageCategoryModal } from "src/pages/package-categories/modals";
import { IConfirmModalProps } from "src/shared/modals";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ModalName = "CreateDepartmentModal" | "CreatePackageCategoryModal" | "ConfirmModal";

export type ModalRegistryGuard = {
  [key in ModalName]?: unknown;
};

// if i try to create another type to automatically remove IModalProps
// it will not work and will behave like 'any' :/
export interface IModalRegistry extends ModalRegistryGuard {
  CreateDepartmentModal?: Omit<ICreateDepartmentModalProps, keyof IModalProps>;
  CreatePackageCategoryModal?: Omit<ICreatePackageCategoryModal, keyof IModalProps>;
  ConfirmModal?: Omit<IConfirmModalProps, keyof IModalProps>;
}
