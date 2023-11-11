import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const DescriptionField: React.FC = () => {
  return (
    <Controller
      name="description"
      rules={{
        maxLength: 150,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Package Description"
          placeholder="Enter Package Description"
          data-testid="description"
          multiline
        />
      )}
    />
  );
};
