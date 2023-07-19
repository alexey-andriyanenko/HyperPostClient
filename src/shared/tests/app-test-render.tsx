import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useStore } from "src/store";
import { ModalsProvider } from "src/app/providers/modals";

import { BrowserRouter } from "react-router-dom";

const TestProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>{children}</BrowserRouter>
      <ModalsProvider />
    </ThemeProvider>
  );
};

export const appTestRender = async (component: React.ReactElement, auth = true) => {
  if (auth) {
    const userStore = useStore("user");
    await userStore.loadMe();
  }

  return render(component, { wrapper: TestProviders });
};
