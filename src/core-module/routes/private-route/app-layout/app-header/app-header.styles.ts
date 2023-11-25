import { Box, IconButton, styled } from "@mui/material";

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  height: "60px",
  minHeight: "60px",
  maxHeight: "60px",
  padding: "16px 32px",
  backgroundColor: theme.palette.primary.main,
  color: "white",
}));

export const ProfileButton = styled(IconButton)(() => ({
  color: "white",
}));
