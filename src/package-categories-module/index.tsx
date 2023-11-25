import React from "react";
import { IRoute } from "src/core-module/routes";

import PackagesCategories from "./pages/package-categories";
import { Providers } from "./providers";

export const PackagesCategoriesRoutes = {
  packagesCategories: "/package-categories",
};

const routes: IRoute[] = [
  {
    path: PackagesCategoriesRoutes.packagesCategories,
    element: <PackagesCategories />,
    isPrivate: true,
  },
];

export default {
  routes,
  Providers,
};
