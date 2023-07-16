import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { RoutesProvider } from "./providers/routes";
import { ModalsProvider } from "./providers/modals";
import { useStore } from "../store";

export const App = observer(() => {
  const theme = createTheme();
  const userStore = useStore("user");

  useEffect(() => {
    if (!userStore.loggedIn) return;
    userStore.loadMe();
  }, [userStore.loggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesProvider />
      <ModalsProvider />
    </ThemeProvider>
  );
});
