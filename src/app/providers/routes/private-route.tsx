import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

import { useStore } from "src/store";

import { AUTH_ROUTE } from "./routes.config";

export interface IPrivateRouteProps {
  children: React.ReactNode;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const userStore = useStore("user");

  useEffect(() => {
    if (!userStore.loggedIn) return;
    if (!userStore.user) userStore.loadMe().catch(() => navigate(AUTH_ROUTE.path));
  }, [userStore.loggedIn, userStore.user]);

  if (!userStore.loggedIn) return <Navigate to={AUTH_ROUTE.path} />;
  return <>{children}</>;
};
