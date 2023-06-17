import React from "react";
import { Box } from "@mui/material";
export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box component="main"> {children} </Box>;
};
