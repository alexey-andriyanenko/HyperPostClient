import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const PackageWeight: React.FC = () => {
  return (
    <Controller
      name="weight"
      render={({ field }) => (
        <TextField
          {...field}
          label="Package Weight"
          placeholder="Enter package weight"
          data-testid="package-weight"
          required
          fullWidth
        />
      )}
    />
  );
};
