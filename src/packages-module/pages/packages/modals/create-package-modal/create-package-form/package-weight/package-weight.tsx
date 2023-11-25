import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { ICreatePackageForm } from "../create-package-form.types";

export const PackageWeight: React.FC = () => {
  const { control } = useFormContext<ICreatePackageForm>();

  return (
    <Controller
      name="weight"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Package Weight (kg)"
          placeholder="Enter package weight"
          data-testid="package-weight"
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
