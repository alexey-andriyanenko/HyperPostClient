import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

import { IDepartment } from "src/departments-module/models";

export interface IDetailsItem {
  title: string;
  data: IDepartment;
}

export const DetailsItem: React.FC<IDetailsItem> = ({ title, data }) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary={title} secondary={data.fullAddress} />
      </ListItem>
    </List>
  );
};
