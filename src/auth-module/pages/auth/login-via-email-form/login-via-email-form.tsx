import React from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { EMAIL_PATTERN } from "src/shared-module/constants";
import { useAuthStore } from "src/auth-module/store";

import { ILoginViaEmailForm } from "./login-via-email-form.types";

export const LoginViaEmailForm = () => {
  const navigate = useNavigate();
  const userStore = useAuthStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginViaEmailForm>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: ILoginViaEmailForm) => {
    try {
      await userStore.loginViaEmail(data);
    } catch (error) {
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
          setError("email", {
            type: "manual",
            message: "Invalid email or password",
          });
          setError("password", {
            type: "manual",
          });

          return;
        }
      }

      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
      data-testid="login-via-email-form"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        data-testid="email"
        label="Email Address"
        placeholder="Enter email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: EMAIL_PATTERN,
            message: "Please enter a valid email address",
          },
        })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        placeholder="Enter password"
        type="password"
        id="password"
        data-testid="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password", { required: "Password is required" })}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        data-testid="submit"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <CircularProgress size={24} sx={{ position: "absolute" }} data-testid="loader" />
        ) : (
          "Sign In"
        )}
      </Button>
    </Box>
  );
};
