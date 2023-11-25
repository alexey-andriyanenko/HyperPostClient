import React from "react";

import Departments from "./pages/departments";
import { Providers } from "./providers";

export const DepartmentsRoutes = {
  departments: "/departments",
};

export default {
  routes: [
    {
      path: DepartmentsRoutes.departments,
      element: <Departments />,
      isPrivate: true,
    },
  ],
  Providers: Providers,
};
