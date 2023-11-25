import React from "react";

import { IRoute } from "src/core-module/routes";

import Packages from "./pages/packages";
import { Providers } from "./providers";

export const PackagesRoutes = {
  packages: "/packages",
};

const routes: IRoute[] = [
  {
    path: PackagesRoutes.packages,
    element: <Packages />,
    isPrivate: true,
  },
];

export default {
  routes: routes,
  Providers,
};
