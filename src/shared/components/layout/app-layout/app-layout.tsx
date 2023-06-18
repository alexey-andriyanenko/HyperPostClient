import React from "react";

import { AppSidebar } from "src/shared/components/ui";
import { PageContainer } from "../page-container";
import { PageContent } from "../page-content";
import { PageHeader } from "../page-header";

import { Container } from "./app-layout.styles";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container container wrap="nowrap">
      <AppSidebar />

      <PageContainer>
        <PageHeader />
        <PageContent> {children} </PageContent>
      </PageContainer>
    </Container>
  );
};
