import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { RoutesProvider } from "src/app/providers/routes";
import { BrowserRouter } from "react-router-dom";

const TestProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};

export const appTestRender = (component: React.ReactElement) =>
  render(component, { wrapper: TestProviders });
