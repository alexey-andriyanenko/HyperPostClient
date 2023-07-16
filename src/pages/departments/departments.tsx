import React from "react";
import { PageContent } from "src/shared/components/layout/page-content";
import { Grid, Typography, Button } from "@mui/material";

import { DTable } from "./dtable";
import { useStore } from "src/store";

const Departments = () => {
  const modals = useStore("modals");

  return (
    <PageContent>
      <Grid container direction="row" justifyContent="space-between">
        <Typography variant="h3"> Departments </Typography>
        <Button
          variant="contained"
          data-testid="create-department-button"
          onClick={() => modals.open("CreateDepartmentModal", { name: "HELLOWORLD" })}
        >
          Create New Department
        </Button>
      </Grid>
      <DTable />
    </PageContent>
  );
};

export default Departments;
