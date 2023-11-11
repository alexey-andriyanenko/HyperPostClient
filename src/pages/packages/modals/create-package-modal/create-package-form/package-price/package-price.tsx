import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const PackagePrice: React.FC = () => {
  return (
    <Controller
      name="packagePrice"
      render={({ field }) => (
        <TextField
          {...field}
          label="Package Price"
          placeholder="Enter package price"
          data-testid="package-price"
          required
          fullWidth
        />
      )}
    />
  );
};
