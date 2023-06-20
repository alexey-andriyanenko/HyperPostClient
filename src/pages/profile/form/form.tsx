import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { Button, TextField } from "@mui/material";

import { useStore } from "src/store";
import { EMAIL_PATTERN, ROLES_NAMES } from "src/constants";
import { RolesEnum } from "src/models";
import { Container } from "./form.styles";
import { IProfileForm } from "./form.types";

export const Form: React.FC = observer(() => {
  const userStore = useStore("user");

  const { handleSubmit, reset, control, setValue, formState } = useForm<IProfileForm>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: RolesEnum.Client,
    },
  });

  useEffect(() => {
    if (!userStore.user) return;

    reset({
      firstName: userStore.user.firstName,
      lastName: userStore.user.lastName,
      email: userStore.user.email,
      roleId: userStore.user.roleId,
    });
  }, [userStore.user]);

  return (
    <Container component="form" data-testid="profile-form">
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: { value: true, message: "First Name is required" },
          maxLength: { value: 30, message: "Max Length: 30" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="First Name"
            placeholder="Enter First Name"
            data-testid="first-name"
            fullWidth
            error={!!formState.errors.firstName}
            helperText={formState.errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{
          required: { value: true, message: "Last Name is required" },
          maxLength: { value: 30, message: "Max Length: 30" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Last Name"
            placeholder="Enter Last Name"
            data-testid="last-name"
            fullWidth
            error={!!formState.errors.lastName}
            helperText={formState.errors.lastName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address" },
          maxLength: { value: 50, message: "Max Length: 50" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Email"
            placeholder="Enter Email"
            data-testid="email"
            fullWidth
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
          />
        )}
      />

      <Controller
        name="roleId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={ROLES_NAMES[field.value]}
            required
            label="Role"
            placeholder="Enter Role"
            data-testid="role-id"
            fullWidth
            disabled
          />
        )}
      />

      <Button
        color="primary"
        variant="contained"
        data-testid="submit-button"
        fullWidth
        disabled={!formState.isDirty || !formState.isValid}
      >
        Submit
      </Button>
    </Container>
  );
});
