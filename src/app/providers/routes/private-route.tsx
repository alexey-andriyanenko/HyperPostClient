import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";
import { AppLayout } from "src/shared/components/layout";

import { AUTH_ROUTE } from "./routes.config";

export interface IPrivateRouteProps {
  children: React.ReactNode;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = observer(({ children }) => {
  const userStore = useStore("user");

  if (!userStore.loggedIn) return <Navigate to={AUTH_ROUTE.path} />;
  return <AppLayout>{children}</AppLayout>;
});
