import React from "react";

import { ModalsProvider } from "./modals";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ModalsProvider />
      {children}
    </>
  );
};
