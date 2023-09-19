import React from "react";

import { ModalRegistryGuard } from "src/store/modals";
import { ConfirmModal, IConfirmModalProps } from "src/shared/modals";
import { CreateDepartmentModal, ICreateDepartmentModalProps } from "src/pages/departments/modals";
import {
  CreatePackageCategoryModal,
  ICreatePackageCategoryModal,
} from "src/pages/package-categories/modals";
import { ViewPackageModal, IViewPackageModalProps } from "src/pages/packages/modals";

export interface IModalsProviderRegistry extends ModalRegistryGuard {
  CreateDepartmentModal: React.FC<ICreateDepartmentModalProps>;
  CreatePackageCategoryModal: React.FC<ICreatePackageCategoryModal>;
  ConfirmModal: React.FC<IConfirmModalProps>;
  ViewPackageModal: React.FC<IViewPackageModalProps>;
}

export const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
  CreatePackageCategoryModal,
  ConfirmModal,
  ViewPackageModal,
};
