import React from "react";
import { observer } from "mobx-react-lite";
import { IModalProps } from "src/store/modals/modals.store.types";
import { Modal } from "@mui/material";

export interface ICreateDepartmentModalProps extends IModalProps {
  name: string;
}

export const CreateDepartmentModal: React.FC<ICreateDepartmentModalProps> = observer(
  ({ isOpen, name, onClose }) => {
    return (
      <Modal open={isOpen} onClose={onClose}>
        hello
      </Modal>
    );
  },
);
