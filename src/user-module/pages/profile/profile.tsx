import React from "react";
import { Typography } from "@mui/material";

import { PageContent } from "src/shared-module/components/layout";
import { Form } from "./form";

export default function () {
  return (
    <PageContent>
      <Typography variant="h3"> Profile </Typography>
      <Form />
    </PageContent>
  );
}
