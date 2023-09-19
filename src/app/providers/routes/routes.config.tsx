import React from "react";
import { RouteProps } from "react-router";
import { Home } from "src/pages/home";
import Profile from "src/pages/profile";
import Departments from "src/pages/departments";
import PackageCategories from "src/pages/package-categories";
import Packages from "src/pages/packages";

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

export const DEPARTMENTS_ROUTE: IAppRoute = {
  path: "/departments",
  element: <Departments />,
};

export const PACKAGE_CATEGORIES_ROUTE: IAppRoute = {
  path: "/package-categories",
  element: <PackageCategories />,
};

export const PACKAGES_ROUTE: IAppRoute = {
  path: "/packages",
  element: <Packages />,
};

export const publicRoutes = [AUTH_ROUTE, FALLBACK_ROUTE];
export const privateRoutes = [
  HOME_ROUTE,
  PROFILE_ROUTE,
  DEPARTMENTS_ROUTE,
  PACKAGE_CATEGORIES_ROUTE,
  PACKAGES_ROUTE,
];
