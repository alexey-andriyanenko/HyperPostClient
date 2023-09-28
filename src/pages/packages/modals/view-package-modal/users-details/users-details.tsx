import React from "react";
import { TableContainer } from "@mui/material";

import { IPackage } from "src/models";

import { DetailsItem } from "./details-item";

export interface IUsersDetailsProps {
  senderUser: IPackage["senderUser"];
  receiverUser: IPackage["receiverUser"];
}

export const UsersDetails: React.FC<IUsersDetailsProps> = ({ senderUser, receiverUser }) => {
  return (
    <TableContainer data-testid="users-details">
      <DetailsItem title="Sender" data={senderUser} />
      <DetailsItem title="Receiver" data={receiverUser} />
    </TableContainer>
  );
};
