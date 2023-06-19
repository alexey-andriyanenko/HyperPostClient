import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IProfileForm } from "./form.types";
import { Button, TextField } from "@mui/material";

import { useStore } from "src/store";

import { Container } from "./form.styles";
import { observer } from "mobx-react-lite";

export const Form: React.FC = observer(() => {
  const userStore = useStore("user");
  const { handleSubmit, register, control, setValue } = useForm<IProfileForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: 0,
    },
  });

  useEffect(() => {
    if (!userStore.user) return;

    setValue("firstName", userStore.user?.firstName);
    setValue("lastName", userStore.user?.lastName);
    setValue("email", userStore.user?.email);
    setValue("roleId", userStore.user?.roleId);
  }, [userStore.user]);

  return (
    <Container component="form" data-testid="profile-form">
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="First Name"
            placeholder="Enter First Name"
            data-testid="first-name"
            fullWidth
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Last Name"
            placeholder="Enter Last Name"
            data-testid="last-name"
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Email"
            placeholder="Enter Email"
            data-testid="email"
            fullWidth
          />
        )}
      />

      <Controller
        name="roleId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Role"
            placeholder="Enter Role"
            data-testid="role-id"
            fullWidth
            disabled
          />
        )}
      />

      <Button color="primary" variant="contained" fullWidth>
        Submit
      </Button>
    </Container>
  );
});
