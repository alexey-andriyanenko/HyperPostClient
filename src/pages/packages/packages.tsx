import React from "react";
import { Button, Grid, Typography } from "@mui/material";

import { PageContent } from "src/shared/components/layout";

import { PackagesTable } from "./packages-table";

export default function () {
  return (
    <PageContent>
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h3"> Packages </Typography>
        <Button variant="contained" data-testid="create-department-button">
          Create New Package
        </Button>
      </Grid>

      <PackagesTable />
    </PageContent>
  );
}
