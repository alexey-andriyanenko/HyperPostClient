import React from "react";
import { ModalRegistryGuard } from "src/store/modals";
import { CreateDepartmentModal, TCreateDepartmentModalProps } from "src/pages/departments/modals";

export interface IModalsProviderRegistry extends ModalRegistryGuard {
  CreateDepartmentModal: React.FC<TCreateDepartmentModalProps>;
}

export const modalsRegistry: IModalsProviderRegistry = {
  CreateDepartmentModal,
};
