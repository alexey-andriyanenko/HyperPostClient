import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { IPackage } from "src/packages-module/models";

export interface IPackageDetailsProps {
  data: IPackage;
}

export const PackageDetails: React.FC<IPackageDetailsProps> = ({ data }) => {
  return (
    <Box data-testid="package-details">
      <List>
        <ListItem>
          <ListItemText primary="Package Price: " secondary={`${data.packagePrice}$`} />
          <ListItemText primary="Delivery Price: " secondary={`${data.deliveryPrice}$`} />
          <ListItemText primary="Weight: " secondary={`${data.weight}kg`} />
        </ListItem>
      </List>

      {data.description ? <Typography>{data.description}</Typography> : null}
    </Box>
  );
};
