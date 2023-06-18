import { Box, styled } from "@mui/material";

export const Header = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "60px",
  minHeight: "60px",
  maxHeight: "60px",
  backgroundColor: theme.palette.primary.main,
}));
