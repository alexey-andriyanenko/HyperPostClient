import { Box, styled } from "@mui/material";

export const Content = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  width: "100%",
  padding: "24px 16px 32px 16px",
  overflowY: "auto",
}));
