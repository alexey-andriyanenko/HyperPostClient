import React from "react";
import { PageContent } from "src/shared/components/layout";
import { Button, Grid, Typography } from "@mui/material";

import { useStore } from "src/store";

import { PCTable } from "./pc-table";

export default function () {
  const modals = useStore("modals");

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
