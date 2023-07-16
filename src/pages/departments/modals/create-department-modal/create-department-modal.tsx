import React from "react";
import { observer } from "mobx-react-lite";
import { IModalProps } from "src/store/modals/modals.store.types";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { CreateDepartmentForm } from "./create-department-form";

export interface ICreateDepartmentModalProps extends IModalProps {
  name: string;
}

export const CreateDepartmentModal: React.FC<ICreateDepartmentModalProps> = observer(
  ({ isOpen, name, onClose }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle> Create Department </DialogTitle>
        <DialogContent>
          <CreateDepartmentForm />
        </DialogContent>
      </Dialog>
    );
  },
);
