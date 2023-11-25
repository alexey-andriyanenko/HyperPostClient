import React from "react";
import { PageContent } from "src/shared-module/components/layout";
import { Button, Grid, Typography } from "@mui/material";

import { useModalsStore } from "src/package-categories-module/store/modals";

import { PCTable } from "./pc-table";

export default function () {
  const modals = useModalsStore();

  return (
    <PageContent>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h3"> Package Categories </Typography>
        <Button
          variant="contained"
          data-testid="create-package-category-button"
          onClick={() => modals.open("CreatePackageCategoryModal", {})}
        >
          Create New Package Category
        </Button>
      </Grid>
      <PCTable />
    </PageContent>
  );
}
