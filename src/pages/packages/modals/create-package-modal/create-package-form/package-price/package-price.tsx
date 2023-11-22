import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

import { ICreatePackageForm } from "../create-package-form.types";

export const PackagePrice: React.FC = () => {
  const { control } = useFormContext<ICreatePackageForm>();

  return (
    <Controller
      name="packagePrice"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Package Price ($)"
          placeholder="Enter package price"
          data-testid="package-price"
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
