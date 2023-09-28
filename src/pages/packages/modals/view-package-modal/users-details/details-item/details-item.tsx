import React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { IUser } from "src/models";

export interface IDetailsItemProps {
  title: string;
  data: IUser;
}

export const DetailsItem: React.FC<IDetailsItemProps> = ({ title, data }) => {
  return (
    <Paper>
      <List>
        <ListItem>
          <ListItemText primary={title} secondary={`${data.firstName} ${data.lastName}`} />
          <ListItemText primary="Phone: " secondary={data.phoneNumber} />
          <ListItemText primary="Email: " secondary={data.email} />
        </ListItem>
      </List>
    </Paper>
  );
};
