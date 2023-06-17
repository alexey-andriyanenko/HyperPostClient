import React from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useStore } from "src/store";
import { HOME_ROUTE } from "src/app/providers/routes";

import { ILoginViaPhoneForm } from "./login-via-phone-form.types";

export const LoginViaPhoneForm = () => {
  const navigate = useNavigate();
  const userStore = useStore("user");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginViaPhoneForm>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: ILoginViaPhoneForm) => {
    const res = await userStore.loginViaPhone(data);

    if (res instanceof Error) {
      console.error(res);
      return;
    }

    navigate(HOME_ROUTE.path);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
      data-testid="login-via-phone-form"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        data-testid="phone"
        label="Phone"
        placeholder="(123) 456-7890"
        type="tel"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        {...register("phoneNumber", {
          required: "Phone is required",
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
