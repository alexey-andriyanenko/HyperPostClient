import React from "react";
import { Icon } from "@mui/material";

import { Header, ProfileButton } from "./app-header.styles";

export interface IAppHeaderProps {
  onProfileClick?: VoidFunction;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({ onProfileClick }) => {
  return (
    <Header component="header" data-testid="page-header">
      <ProfileButton onClick={onProfileClick}>
        <Icon className="material-symbols-outlined">account_circle</Icon>
      </ProfileButton>
    </Header>
  );
};
