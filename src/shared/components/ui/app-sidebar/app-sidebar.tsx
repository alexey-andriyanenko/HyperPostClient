import React from "react";
import { observer } from "mobx-react-lite";

import { rootStore } from "src/store";

import { Container, Nav, Link } from "./app-sidebar.styles";
import { navItems } from "./app-sidebar.constants";

export const AppSidebar = observer(() => {
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
        <Link variant="text" color="error" fullWidth onClick={() => rootStore.logout()}>
          Log Out
        </Link>
      </Nav>
    </Container>
  );
});
