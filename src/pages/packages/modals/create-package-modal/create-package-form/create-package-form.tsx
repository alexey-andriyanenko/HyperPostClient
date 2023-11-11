import React from "react";
import { observer } from "mobx-react-lite";

import { PackageCategoryField } from "./package-category-field";
import { DepartmentField } from "./department-field";
import { Container } from "./create-package-form.styles";
import { UserFields } from "./user-fields";
import { DescriptionField } from "./description-field";
import { FormProvider, useForm } from "react-hook-form";
import { ICreatePackageForm } from "./create-package-form.types";
import { Button, CircularProgress } from "@mui/material";
import { PackagePrice } from "./package-price";
import { DeliveryPrice } from "./delivery-price";
import { PackageWeight } from "./package-weight";

export const CreatePackageForm: React.FC = observer(() => {
  const form = useForm<ICreatePackageForm>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const handleSubmit = async (values: ICreatePackageForm) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <Container
        component="form"
        data-testid="create-package-form"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <PackageCategoryField />

        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
        <DepartmentField
          name="receiverDepartmentId"
          label="Receiver Department"
          placeholder="Select Receiver Department"
          data-testid="receiver-department"
        />

        <UserFields name="senderUserId" title="From" data-testid="from-user" />
        <UserFields name="receiverUserId" title="To" data-testid="to-user" />

        <PackagePrice />
        <DeliveryPrice />
        <PackageWeight />

        <DescriptionField />

        <Button
          variant="outlined"
          color="primary"
          type="submit"
          data-testid="submit-btn"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <CircularProgress size={24} sx={{ position: "absolute" }} data-testid="loader" />
          ) : (
            "Submit"
          )}
        </Button>
      </Container>
    </FormProvider>
  );
});
