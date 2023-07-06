import React from "react";
import { PageContent } from "src/shared/components/layout/page-content";
import { Grid, Typography, Button } from "@mui/material";

import { DTable } from "./dtable";

const Departments = () => {
  return (
    <PageContent>
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h3"> Departments </Typography>
        <Button variant="contained" data-testid="create-department-button">
          Create New Department
        </Button>
      </Grid>
      <DTable />
    </PageContent>
  );
};

export default Departments;
