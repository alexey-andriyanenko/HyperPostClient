import React from "react";
import { ModalRegistryGuard } from "src/store/modals";
import { CreateDepartmentModal, ICreateDepartmentModalProps } from "src/pages/departments/modals";
import {
  CreatePackageCategoryModal,
  TCreatePackageCategoryModal,
} from "src/pages/package-categories/modals";

export interface IModalsProviderRegistry extends ModalRegistryGuard {
  CreateDepartmentModal: React.FC<ICreateDepartmentModalProps>;
  CreatePackageCategoryModal: React.FC<TCreatePackageCategoryModal>;
}

export const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
  CreatePackageCategoryModal,
};
