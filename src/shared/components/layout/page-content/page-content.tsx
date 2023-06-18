import React from "react";

import { Content } from "./page-content.styles";

export const PageContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Content data-testid="page-content">{children}</Content>;
};
