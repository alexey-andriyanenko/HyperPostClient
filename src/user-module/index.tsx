import React from "react";

import { IRoute } from "src/core-module/routes";

import Profile from "./pages/profile";

export const UserRoutes = {
  profile: "/profile",
};

const routes: IRoute[] = [
  {
    path: UserRoutes.profile,
    element: <Profile />,
    isPrivate: true,
  },
];

export default {
  routes,
};
