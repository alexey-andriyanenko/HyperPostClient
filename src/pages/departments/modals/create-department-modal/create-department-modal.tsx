import React from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { IModalProps } from "src/store/modals/modals.store.types";
import { IDepartment } from "src/models";

import { CreateDepartmentForm } from "./create-department-form";

export interface ICreateDepartmentModalProps extends IModalProps {
  department?: IDepartment;
}

export const CreateDepartmentModal: React.FC<ICreateDepartmentModalProps> = observer(
  ({ isOpen, department, onClose }) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        data-testid="create-department-modal"
      >
        <DialogTitle> Create Department </DialogTitle>
        <DialogContent>
          <CreateDepartmentForm department={department} onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  },
);
