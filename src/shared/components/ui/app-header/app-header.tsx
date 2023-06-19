import React from "react";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router";

import { PROFILE_ROUTE } from "src/app/providers/routes";

import { Header, ProfileButton } from "./app-header.styles";

export const AppHeader = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    // TODO: replace this with PROFILE_AUTH.path
    navigate(PROFILE_ROUTE.path);
  };

  return (
    <Header component="header" data-testid="page-header">
      <ProfileButton onClick={handleProfile}>
        <Icon className="material-symbols-outlined">account_circle</Icon>
      </ProfileButton>
    </Header>
  );
};
