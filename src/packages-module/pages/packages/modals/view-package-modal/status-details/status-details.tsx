import React from "react";
import { observer } from "mobx-react-lite";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

import { formatDate } from "src/shared-module/utils";
import { IPackage } from "src/packages-module/models";

import { statusSteps } from "./status-details.constants";

export interface IStatusDetails {
  data: IPackage;
}

export const StatusDetails = observer<IStatusDetails>(({ data }) => {
  return (
    <Box data-testid="status-details">
      <Stepper>
        {statusSteps.map(({ label, labelFor, statusName }) => {
          const isCompleted = data[labelFor] !== null;

          return (
            <Step key={label} completed={isCompleted}>
              <StepLabel
                data-testid={`${statusName}-${isCompleted ? "complete" : "incomplete"}`}
                optional={
                  isCompleted ? (
                    <Typography> {formatDate(new Date(data[labelFor]!))} </Typography>
                  ) : null
                }
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
});
