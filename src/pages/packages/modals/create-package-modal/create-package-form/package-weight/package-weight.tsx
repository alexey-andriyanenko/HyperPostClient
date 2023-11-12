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
      rules={{
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 0.2,
          message: "Minimum weight is 0.2 kg",
        },
        max: {
          value: 100,
          message: "Maximum weight is 9999 kg",
        },
      }}
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
