import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { observer } from "mobx-react-lite";

import { IModalProps } from "src/store/modals";

import { CreatePackageCategoryForm } from "./create-package-category-form";

export type TCreatePackageCategoryModal = IModalProps;

export const CreatePackageCategoryModal: React.FC<TCreatePackageCategoryModal> = observer(
  ({ isOpen, onClose }) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        data-testid="create-package-category-modal"
      >
        <DialogTitle> Create Package Category </DialogTitle>
        <DialogContent>
          <CreatePackageCategoryForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  },
);
