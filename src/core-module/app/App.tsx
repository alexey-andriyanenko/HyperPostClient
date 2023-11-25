import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { useAuthStore } from "src/auth-module/store";
import { useStore as useUserStore } from "src/user-module/store/user";

import AuthModule from "src/auth-module";
import UserModule from "src/user-module";
import DepartmentsModule from "src/departments-module";
import PackagesModule from "src/packages-module";
import PackageCategoriesModule from "src/package-categories-module";

import { Navigator } from "../navigator";
import { AppRoutes } from "../routes";

export const App = observer(() => {
  const theme = createTheme();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (!authStore.isLogged) return;
    userStore.loadMe();
  }, [authStore.isLogged]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navigator />

        <AppRoutes routes={AuthModule.routes} />
        <AppRoutes routes={UserModule.routes} />
        <DepartmentsModule.Providers>
          <AppRoutes routes={DepartmentsModule.routes} />
        </DepartmentsModule.Providers>
        <PackagesModule.Providers>
          <AppRoutes routes={PackagesModule.routes} />
        </PackagesModule.Providers>
        <PackageCategoriesModule.Providers>
          <AppRoutes routes={PackageCategoriesModule.routes} />
        </PackageCategoriesModule.Providers>
      </BrowserRouter>
    </ThemeProvider>
  );
});
