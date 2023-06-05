import React from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "./routes.config";

export const RoutesProvider: React.FC = () => {
  return <RouterProvider router={routes} />;
};
