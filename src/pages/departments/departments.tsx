import React from "react";
import { PageContent } from "src/shared/components/layout/page-content";
import { Typography } from "@mui/material";

import { DTable } from "./dtable";

const Departments = () => {
  return (
    <PageContent>
      <Typography variant="h3"> Departments </Typography>
      <DTable />
    </PageContent>
  );
};

export default Departments;
