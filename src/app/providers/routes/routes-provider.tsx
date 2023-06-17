import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Route } from "react-router";

import { AppSidebar } from "src/shared/components/ui";
import { PageContainer } from "src/shared/components/layout";

import { PrivateRoute } from "./private-route";
import { privateRoutes, publicRoutes } from "./routes.config";

export const RoutesProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((props) => (
          <Route key={props.path} {...props} />
        ))}
        {privateRoutes.map((props) => (
          <Route
            key={props.path}
            path={props.path}
            element={<PrivateRoute> {props.element} </PrivateRoute>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
