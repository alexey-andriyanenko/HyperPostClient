import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { eventBus } from "src/event-bus";
import { UserRoutes } from "src/user-module";

export const Navigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    eventBus.on("login", () => {
      navigate(UserRoutes.profile);
    });
  }, []);

  return null;
};
