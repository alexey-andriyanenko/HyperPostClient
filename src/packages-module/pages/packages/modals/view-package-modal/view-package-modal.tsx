import React from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

import { IModalProps } from "src/modals-module";
import { IPackage } from "src/packages-module/models";

import { StatusDetails } from "./status-details";
import { UsersDetails } from "./users-details";
import { DepartmentsDetails } from "./departments-details";
import { PackageDetails } from "./package-details";

export interface IViewPackageModalProps extends IModalProps {
  data: IPackage;
}

export const ViewPackageModal: React.FC<IViewPackageModalProps> = observer(
  ({ isOpen, onClose, data }) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        data-testid="view-package-modal"
      >
        <DialogTitle> Package Details </DialogTitle>
        <DialogContent>
          <StatusDetails data={data} />
          <UsersDetails senderUser={data.senderUser} receiverUser={data.receiverUser} />
          <DepartmentsDetails
            senderDepartment={data.senderDepartment}
            receiverDepartment={data.receiverDepartment}
          />
          <PackageDetails data={data} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" data-testid="close-button" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);
