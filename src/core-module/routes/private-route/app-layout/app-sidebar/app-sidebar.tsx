import React from "react";

import { eventBus } from "src/event-bus";

import { Container, Nav, Link } from "./app-sidebar.styles";
import { navItems } from "./app-sidebar.constants";

export const AppSidebar = () => {
  const handleLogout = () => eventBus.emit("logout");

  return (
    <Container data-testid="app-sidebar" elevation={5}>
      <Nav component="nav">
        {navItems.map((item) => (
          <Link key={item.path} variant="text" fullWidth href={item.path}>
            {item.label}
          </Link>
        ))}
      </Nav>

      <Nav>
        <Link variant="text" color="error" fullWidth onClick={handleLogout}>
          Log Out
        </Link>
      </Nav>
    </Container>
  );
};
