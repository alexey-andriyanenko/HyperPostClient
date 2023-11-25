import React from "react";

import Auth from "./pages/auth";
import { IRoute } from "../core-module/routes";

export const AuthRoutes = {
  auth: "/auth",
};

const routes: IRoute[] = [
  {
    path: AuthRoutes.auth,
    element: <Auth />,
  },
];

const authModule = {
  routes,
};

export default authModule;
