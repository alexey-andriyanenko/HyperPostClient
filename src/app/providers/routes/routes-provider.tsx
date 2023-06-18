import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";

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
