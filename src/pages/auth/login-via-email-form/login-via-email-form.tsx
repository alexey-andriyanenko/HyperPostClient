import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Icon,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { ILoginViaEmailForm } from "./login-via-email-form.types";

export const LoginViaEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ILoginViaEmailForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: ILoginViaEmailForm) => {};

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
            value: /\S+@\S+\.\S+/,
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
        disabled={!isValid || isSubmitting}
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
