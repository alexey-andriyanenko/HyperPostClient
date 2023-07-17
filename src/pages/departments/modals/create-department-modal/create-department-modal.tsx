import React from "react";
import { observer } from "mobx-react-lite";
import { IModalProps } from "src/store/modals/modals.store.types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { CreateDepartmentForm } from "./create-department-form";

export type TCreateDepartmentModalProps = IModalProps;

export const CreateDepartmentModal: React.FC<TCreateDepartmentModalProps> = observer(
  ({ isOpen, onClose }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle> Create Department </DialogTitle>
        <DialogContent>
          <CreateDepartmentForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  },
);
