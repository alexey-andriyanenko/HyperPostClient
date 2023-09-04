import React from "react";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Button, CircularProgress, TextField } from "@mui/material";

import { useStore } from "src/store";

import { ICreateDepartmentForm } from "./create-department-form.types";
import { Actions, Container } from "./create-department-form.styles";
import { isApiError } from "src/shared/utils";
import { ApiErrorTypeEnum, IDepartment } from "src/models";

export interface ICreateDepartmentFormProps {
  department?: IDepartment;
  onClose: () => void;
}

export const CreateDepartmentForm: React.FC<ICreateDepartmentFormProps> = observer(
  ({ department, onClose }) => {
    const departments = useStore("departments");
    const { control, setError, formState, handleSubmit } = useForm<ICreateDepartmentForm>({
      mode: "onChange",
      defaultValues: {
        number: department?.number ?? 0,
        fullAddress: department?.fullAddress ?? "",
      },
    });

    const onSubmit = handleSubmit(async ({ number, fullAddress }) => {
      try {
        if (department) {
          await departments.editDepartment(department.id, { fullAddress });
        } else {
          await departments.createDepartment({ number, fullAddress });
        }

        onClose();
      } catch (e) {
        const _isApiError = isApiError(e);

        if (_isApiError) {
          const { type, message, errors } = e;

          if (type === ApiErrorTypeEnum.departmentUniqueConstraintError && message) {
            setError("number", {
              type: "manual",
              message,
            });
          }

          if (type === ApiErrorTypeEnum.departmentMaxLengthConstraintError && message) {
            setError("fullAddress", {
              type: "manual",
              message,
            });
          }

          if (type === ApiErrorTypeEnum.departmentValidationError && errors) {
            setError("fullAddress", { message: errors.FullAddress[0] });
          }

          return;
        }

        console.error(e);
      }
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
              disabled={!!department}
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
