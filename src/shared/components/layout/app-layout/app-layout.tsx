import React from "react";

import { AppSidebar, AppHeader } from "src/shared/components/ui";
import { PageContainer } from "../page-container";

import { Container } from "./app-layout.styles";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container container wrap="nowrap">
      <AppSidebar />

      <PageContainer>
        <AppHeader />
        {children}
      </PageContainer>
    </Container>
  );
};
