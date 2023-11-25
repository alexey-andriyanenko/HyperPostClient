import React, { memo } from "react";
import { Chip, ChipProps } from "@mui/material";

import { PackageStatusEnum } from "src/packages-module/models";

export interface IPackageStatusProps {
  status: PackageStatusEnum;
}

export const PackageStatus: React.FC<IPackageStatusProps> = memo(({ status }) => {
  const getStatusLabel = () => {
    switch (status) {
      case PackageStatusEnum.Created:
        return "Created";
      case PackageStatusEnum.Sent:
        return "Sent";
      case PackageStatusEnum.Arrived:
        return "Arrived";
      case PackageStatusEnum.Received:
        return "Received";
      case PackageStatusEnum.Archived:
        return "Archived";
      case PackageStatusEnum.Modified:
        return "Modified";
    }
  };

  const getStatusColor = (): ChipProps["color"] => {
    switch (status) {
      case PackageStatusEnum.Created:
        return "default";
      case PackageStatusEnum.Sent:
        return "primary";
      case PackageStatusEnum.Arrived:
        return "secondary";
      case PackageStatusEnum.Received:
        return "info";
      case PackageStatusEnum.Archived:
        return "success";
      case PackageStatusEnum.Modified:
        return "warning";
    }
  };

  const label = getStatusLabel();
  const color = getStatusColor();

  return <Chip label={label} color={color} data-testid="package-status" />;
});
