import React from "react";
import { Grid, Typography, Button } from "@mui/material";

import { PageContent } from "src/shared-module/components/layout/page-content";
import { useModalsStore } from "src/departments-module/store/modals";

import { DTable } from "./dtable";

export default function () {
  const modals = useModalsStore();

  return (
    <PageContent>
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h3"> Departments </Typography>
        <Button
          variant="contained"
          data-testid="create-department-button"
          onClick={() => modals.open("CreateDepartmentModal", {})}
        >
          Create New Department
        </Button>
      </Grid>
      <DTable />
    </PageContent>
  );
}
