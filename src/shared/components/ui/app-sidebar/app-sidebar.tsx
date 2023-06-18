import React, { memo } from "react";
import { navItems } from "./app-sidebar.constants";

import { Container, Nav, Link } from "./app-sidebar.styles";

export const AppSidebar = memo(() => {
  return (
    <Container data-testid="app-sidebar" elevation={5}>
      <Nav component="nav">
        {navItems.map((item) => (
          <Link key={item.path} variant="text" fullWidth href={item.path}>
            {item.label}
          </Link>
        ))}
      </Nav>
    </Container>
  );
});
