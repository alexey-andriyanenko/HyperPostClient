import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { ICreatePackageForm } from "../create-package-form.types";

export const DeliveryPrice: React.FC = () => {
  const { control } = useFormContext<ICreatePackageForm>();

  return (
    <Controller
      name="deliveryPrice"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Delivery Price ($)"
          placeholder="Enter delivery price"
          data-testid="delivery-price"
          required
          fullWidth
          type="number"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
