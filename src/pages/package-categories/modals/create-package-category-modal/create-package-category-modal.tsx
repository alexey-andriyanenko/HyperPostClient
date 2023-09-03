import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { observer } from "mobx-react-lite";

import { IModalProps } from "src/store/modals";
import { IPackageCategory } from "src/models";

import { CreatePackageCategoryForm } from "./create-package-category-form";

export interface ICreatePackageCategoryModal extends IModalProps {
  packageCategory?: IPackageCategory;
}

export const CreatePackageCategoryModal: React.FC<ICreatePackageCategoryModal> = observer(
  ({ isOpen, onClose, packageCategory }) => {
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
          <CreatePackageCategoryForm packageCategory={packageCategory} onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  },
);
