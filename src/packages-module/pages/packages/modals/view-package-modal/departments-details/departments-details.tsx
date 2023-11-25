import React from "react";
import { Box } from "@mui/material";

import { IDepartment } from "src/departments-module/models";

import { DetailsItem } from "./details-item";

export interface IDepartmentsDetails {
  senderDepartment: IDepartment;
  receiverDepartment: IDepartment;
}

export const DepartmentsDetails: React.FC<IDepartmentsDetails> = ({
  senderDepartment,
  receiverDepartment,
}) => {
  return (
    <Box data-testid="departments-details">
      <DetailsItem title="From address: " data={senderDepartment} />
      <DetailsItem title="To address: " data={receiverDepartment} />
    </Box>
  );
};
