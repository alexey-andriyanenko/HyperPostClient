import React from "react";
import { RoutesProvider } from "./providers/routes";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesProvider />
    </ThemeProvider>
  );
};
