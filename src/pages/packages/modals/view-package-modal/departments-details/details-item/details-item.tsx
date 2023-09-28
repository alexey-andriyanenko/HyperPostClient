import React from "react";
import { IDepartment } from "src/models";
import { List, ListItem, ListItemText } from "@mui/material";

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
