import React from "react";
import { IDepartment } from "src/models";
import { Box } from "@mui/material";
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
