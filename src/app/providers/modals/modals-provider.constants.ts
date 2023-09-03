import React from "react";
import { ModalRegistryGuard } from "src/store/modals";
import { CreateDepartmentModal, ICreateDepartmentModalProps } from "src/pages/departments/modals";
import {
  CreatePackageCategoryModal,
  ICreatePackageCategoryModal,
} from "src/pages/package-categories/modals";

export interface IModalsProviderRegistry extends ModalRegistryGuard {
  CreateDepartmentModal: React.FC<ICreateDepartmentModalProps>;
  CreatePackageCategoryModal: React.FC<ICreatePackageCategoryModal>;
}

export const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
  CreatePackageCategoryModal,
};
