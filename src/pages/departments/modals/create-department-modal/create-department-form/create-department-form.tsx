import React from "react";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Button, TextField } from "@mui/material";

import { ICreateDepartmentForm } from "./create-department-form.types";

import { Actions, Container } from "./create-department-form.styles";

export const CreateDepartmentForm: React.FC = observer(() => {
  const { control, formState, handleSubmit } = useForm<ICreateDepartmentForm>({
    mode: "onChange",
    defaultValues: {
      number: 0,
      fullAddress: "",
    },
  });

  const onSubmit = handleSubmit(async ({ number, fullAddress }) => {
    return null;
  });

  return (
    <Container component="form" data-testid="create-department-form" onSubmit={onSubmit}>
      <Controller
        name="number"
        control={control}
        rules={{
          required: { value: true, message: "This field is required" },
          pattern: { value: /^[0-9]*$/, message: "Only number characters are allowed" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Department number"
            placeholder="Enter department number"
            data-testid="number"
            fullWidth
            error={!!formState.errors.number}
            helperText={formState.errors.number?.message}
          />
        )}
      />
      <Controller
        name="fullAddress"
        control={control}
        rules={{
          required: { value: true, message: "This field is required" },
          maxLength: { value: 100, message: "Max length: 100" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Department address"
            placeholder="Enter department address"
            data-testid="fullAddress"
            fullWidth
            error={!!formState.errors.fullAddress}
            helperText={formState.errors.fullAddress?.message}
          />
        )}
      />

      <Actions>
        <Button variant="outlined" color="error" data-testid="cancel-btn">
          Cancel
        </Button>
        <Button variant="outlined" color="primary" type="submit" data-testid="submit-btn">
          Submit
        </Button>
      </Actions>
    </Container>
  );
});
