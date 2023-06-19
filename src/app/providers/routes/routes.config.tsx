import React from "react";
import { RouteProps } from "react-router";
import { Home } from "src/pages/home";
import Profile from "src/pages/profile";

const AuthLazy = React.lazy(() => import("../../../pages/auth"));

export interface IAppRoute {
  path: Required<RouteProps>["path"];
  element: RouteProps["element"];
}

export const AUTH_ROUTE: IAppRoute = {
  path: "/auth",
  element: <AuthLazy />,
};

export const FALLBACK_ROUTE: IAppRoute = {
  path: "*",
  element: <div>404</div>,
};

export const HOME_ROUTE: IAppRoute = {
  path: "/",
  element: <Home />,
};

export const PROFILE_ROUTE: IAppRoute = {
  path: "/profile",
  element: <Profile />,
};

export const publicRoutes = [AUTH_ROUTE, FALLBACK_ROUTE];
export const privateRoutes = [HOME_ROUTE, PROFILE_ROUTE];
