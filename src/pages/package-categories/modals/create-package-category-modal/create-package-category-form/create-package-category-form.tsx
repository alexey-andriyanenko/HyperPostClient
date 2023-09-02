import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Container, Actions } from "./create-package-category-form.styles";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, TextField } from "@mui/material";
import { ICreatePackageCategoryForm } from "./create-package-category-form.types";
import { useStore } from "src/store";
import packageCategories from "../../../package-categories";

export interface ICreatePackageCategoryFormProps {
  onClose: () => void;
}

export const CreatePackageCategoryForm: React.FC<ICreatePackageCategoryFormProps> = observer(
  ({ onClose }) => {
    const store = useStore("packageCategories");
    const { control, formState, handleSubmit } = useForm<ICreatePackageCategoryForm>({
      defaultValues: {
        name: "",
      },
      mode: "onChange",
    });

    const onSubmit = async (values: ICreatePackageCategoryForm) => {
      try {
        await store.createPackageCategory(values);
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <Container
        component="form"
        data-testid="create-package-category-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Package category name"
              placeholder="Enter package category name"
              data-testid="name"
              fullWidth
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          )}
        />

        <Actions>
          <Button variant="outlined" color="error" data-testid="cancel-btn" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            data-testid="submit-btn"
            disabled={!formState.isValid || formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <CircularProgress size={24} sx={{ position: "absolute" }} data-testid="loader" />
            ) : (
              "Submit"
            )}
          </Button>
        </Actions>
      </Container>
    );
  },
);
