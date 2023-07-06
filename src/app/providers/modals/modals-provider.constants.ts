import React from "react";
import { ModalRegistryGuard } from "src/store/modals";
import { CreateDepartmentModal, ICreateDepartmentModalProps } from "src/pages/departments/modals";

export interface IModalsProviderRegistry extends ModalRegistryGuard {
  CreateDepartmentModal: React.FC<ICreateDepartmentModalProps>;
}

export const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
};
