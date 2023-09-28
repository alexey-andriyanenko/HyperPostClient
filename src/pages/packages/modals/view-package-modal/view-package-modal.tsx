import React from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { IModalProps } from "src/store/modals";
import { IPackage } from "src/models";

import { StatusDetails } from "./status-details";
import { UsersDetails } from "./users-details";
import { DepartmentsDetails } from "./departments-details";

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
        </DialogContent>
      </Dialog>
    );
  },
);
