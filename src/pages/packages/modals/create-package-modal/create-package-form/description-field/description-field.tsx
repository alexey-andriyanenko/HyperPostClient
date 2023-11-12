import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { ICreatePackageForm } from "../create-package-form.types";

export const DescriptionField: React.FC = () => {
  const { control } = useFormContext<ICreatePackageForm>();
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        maxLength: {
          value: 150,
          message: "Maximum description length is 150 characters",
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Package Description"
          placeholder="Enter Package Description"
          data-testid="description"
          multiline
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
