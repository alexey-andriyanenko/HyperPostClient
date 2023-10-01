import React from "react";
import { observer } from "mobx-react-lite";

import { PackageCategoryField } from "./package-category-field";

export const CreatePackageForm: React.FC = observer(() => {
  return (
    <form data-testid="create-package-form">
      <PackageCategoryField />
    </form>
  );
});
