import { RouteProps } from "react-router";

export interface IRoute {
  path: Required<RouteProps>["path"];
  element: RouteProps["element"];
  isPrivate?: boolean;
}
