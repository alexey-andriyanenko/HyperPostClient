import React, { memo } from "react";
import { Paper } from "@mui/material";

import styles from "./app-sidebar.module.css";

export const AppSidebar = memo(() => {
  return <Paper className={styles.container} data-testid="app-sidebar"></Paper>;
});
