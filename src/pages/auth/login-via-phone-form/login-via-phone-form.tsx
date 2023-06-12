import React from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";

import { ILoginViaPhoneForm } from "./login-via-phone-form.types";

export const LoginViaPhoneForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ILoginViaPhoneForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: ILoginViaPhoneForm) => {};

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        data-testid="phone"
        label="Phone"
        placeholder="Enter phone"
        type="tel"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register("phone", {
          required: "Phone is required",
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
        type="password"
        placeholder="Enter password"
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
