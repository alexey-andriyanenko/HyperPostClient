import React from "react";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, TextField } from "@mui/material";

import { IPackageCategory } from "src/package-categories-module/models";
import { isApiError } from "src/shared-module/utils";
import { useStore } from "src/package-categories-module/store/package-categories";

import { Container, Actions } from "./create-package-category-form.styles";
import { ICreatePackageCategoryForm } from "./create-package-category-form.types";

export interface ICreatePackageCategoryFormProps {
  packageCategory?: IPackageCategory;
  onClose: VoidFunction;
}

export const CreatePackageCategoryForm: React.FC<ICreatePackageCategoryFormProps> = observer(
  ({ onClose, packageCategory }) => {
    const store = useStore();
    const { control, formState, handleSubmit, setError } = useForm<ICreatePackageCategoryForm>({
      defaultValues: {
        name: packageCategory?.name ?? "",
      },
      mode: "onChange",
    });

    const onSubmit = async (values: ICreatePackageCategoryForm) => {
      try {
        if (packageCategory) {
          await store.editPackageCategory(packageCategory.id, values);
        } else {
          await store.createPackageCategory(values);
        }

        onClose();
      } catch (e) {
        const _isApiError = isApiError(e);

        if (_isApiError) {
          const { message, errors } = e;

          if (message) {
            setError("name", {
              message,
              type: "manual",
            });
          }

          if (errors) {
            setError("name", {
              message: errors.Name[0],
              type: "manual",
            });
          }

          return;
        }

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
