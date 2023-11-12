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
      rules={{
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 1,
          message: "Minimum package price is 1$",
        },
        max: {
          value: 99999999,
          message: "Maximum package price is 99999999$",
        },
      }}
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
