import { styled, Box } from "@mui/material";

export const Container = styled(Box)(() => ({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  columnGap: "16px",
  rowGap: "24px",
  "& > div": {
    width: "calc(50% - 8px)",
  },
}));
