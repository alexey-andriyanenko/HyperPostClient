import React from "react";
import { Dialog, DialogActions, DialogTitle, Button, CircularProgress } from "@mui/material";

import { IModalProps } from "src/store/modals";

export interface IConfirmModalProps extends IModalProps {
  title: string;
  onConfirm: () => void | Promise<any>;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  title,
  onConfirm,
  onClose,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      await onConfirm();
      setIsLoading(false);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="create-department-modal"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="error" data-testid="cancel-btn" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          data-testid="confirm-btn"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ position: "absolute" }} data-testid="loader" />
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
