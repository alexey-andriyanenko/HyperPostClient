import React from "react";

import { Container } from "./page-container.styles";

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container component="main" data-testid="page-container">
      {children}
    </Container>
  );
};
