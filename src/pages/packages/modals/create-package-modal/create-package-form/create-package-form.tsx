import React from "react";
import { observer } from "mobx-react-lite";

import { PackageCategoryField } from "./package-category-field";
import { DepartmentField } from "./department-field";
import { Container } from "./create-package-form.styles";
import { UserFields } from "./user-fields";

export const CreatePackageForm: React.FC = observer(() => {
  return (
    <Container component="form" data-testid="create-package-form">
      <PackageCategoryField />
      <DepartmentField
        label="Sender Department"
        placeholder="Select Sender Department"
        data-testid="sender-department"
      />
      <DepartmentField
        label="Receiver Department"
        placeholder="Select Receiver Department"
        data-testid="receiver-department"
      />

      <UserFields title="From" data-testid="from-user" />
      <UserFields title="To" data-testid="to-user" />
    </Container>
  );
});
