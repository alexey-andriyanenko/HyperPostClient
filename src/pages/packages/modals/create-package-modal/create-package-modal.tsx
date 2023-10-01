import React from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { IModalProps } from "src/store/modals";

import { CreatePackageForm } from "./create-package-form";

export type TCreatePackageModalProps = IModalProps;

export const CreatePackageModal = observer<TCreatePackageModalProps>(({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
      <DialogTitle>Create Package</DialogTitle>
      <DialogContent>
        <CreatePackageForm />
      </DialogContent>
    </Dialog>
  );
});
