import { styled, Box } from "@mui/material";

export const Container = styled(Box)(() => ({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "flex-start",
  gap: "24px",
  padding: "8px 0 0 0",
}));

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: "16px",
  width: "100%",
}));
