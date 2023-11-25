import { Box, Button, Paper, styled } from "@mui/material";

export const Container = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "225px",
  minWidth: "225px",
  maxWidth: "225px",
  paddingTop: "60px",
  paddingBottom: "60px",
}));

export const Nav = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const Link = styled(Button)(() => ({
  paddingLeft: "32px",
  justifyContent: "flex-start",
}));
