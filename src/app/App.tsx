import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { RoutesProvider } from "./providers/routes";

export const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesProvider />
    </ThemeProvider>
  );
};
