import React from "react";

import { useNavigate } from "react-router";

import { AppSidebar, AppHeader } from "src/shared-module/components/ui";
import { PageContainer } from "src/shared-module/components/layout/page-container";
import { UserRoutes } from "src/user-module";

import { Container } from "./app-layout.styles";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const handleProfileClick = React.useCallback(() => {
    navigate(UserRoutes.profile);
  }, []);

  return (
    <Container container wrap="nowrap">
      <AppSidebar />

      <PageContainer>
        <AppHeader onProfileClick={handleProfileClick} />
        {children}
      </PageContainer>
    </Container>
  );
};
