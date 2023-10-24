import { styled, Box } from "@mui/material";

export const Container = styled(Box)(() => ({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
}));

export const NamesContainer = styled(Box)(() => ({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  columnGap: "24px",
  width: "100%",
}));
