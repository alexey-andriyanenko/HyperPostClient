import React from "react";
import { PageContent } from "src/shared/components/layout";
import { Typography } from "@mui/material";

import { PCTable } from "./pc-table";

export default function () {
  return (
    <PageContent>
      <Typography variant="h3"> Package Categories </Typography>
      <PCTable />
    </PageContent>
  );
}
