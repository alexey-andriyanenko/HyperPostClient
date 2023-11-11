import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const DeliveryPrice: React.FC = () => {
  return (
    <Controller
      name="deliveryPrice"
      render={({ field }) => (
        <TextField
          {...field}
          label="Delivery Price"
          placeholder="Enter delivery price"
          data-testid="delivery-price"
          required
          fullWidth
        />
      )}
    />
  );
};
