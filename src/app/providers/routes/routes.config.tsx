import React from "react";
import { RouteProps } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const AuthLazy = React.lazy(() => import("../../../pages/auth"));

export interface IAppRoute {
  path: RouteProps["path"];
  auth: boolean;
  element: RouteProps["element"];
}

export const AUTH_ROUTE: IAppRoute = {
  path: "/auth",
  auth: false,
  element: <AuthLazy />,
};

export const FALLBACK_ROUTE: IAppRoute = {
  path: "*",
  auth: false,
  element: <div>404</div>,
};

export const routes = createBrowserRouter([AUTH_ROUTE, FALLBACK_ROUTE]);
