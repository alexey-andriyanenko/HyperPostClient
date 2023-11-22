import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";
import { PackageCategoryField } from "./package-category-field";
import { DepartmentField } from "./department-field";
import { Container } from "./create-package-form.styles";
import { UserFields } from "./user-fields";
import { DescriptionField } from "./description-field";
import { PackagePrice } from "./package-price";
import { DeliveryPrice } from "./delivery-price";
import { PackageWeight } from "./package-weight";
import { ICreatePackageForm } from "./create-package-form.types";
import { createPackageFormResolver } from "./create-package-form.validator";

export const CreatePackageForm: React.FC = observer(() => {
  const packagesStore = useStore("packages");
  const form = useForm<ICreatePackageForm>({
    defaultValues: {},
    mode: "onChange",
    resolver: createPackageFormResolver,
  });

  const handleSubmit = async (values: ICreatePackageForm) => {
    try {
      await packagesStore.createPackage(values);
    } catch (e) {
      console.error(e);
    }
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

        <Button variant="outlined" color="primary" type="submit" data-testid="submit-btn">
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
