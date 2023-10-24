import React from "react";
import { Box, TextField, Typography } from "@mui/material";

import { Container, NamesContainer } from "./user-fields.styles";

export interface IUserFieldsProps {
  title: string;
  "data-testid": string;
}

export const UserFields: React.FC<IUserFieldsProps> = ({ title, "data-testid": testId }) => {
  return (
    <Container data-testid={testId}>
      <Typography>{title}</Typography>
      <TextField
        label="Phone number or email"
        placeholder="Enter phone number or email"
        data-testid="phone-or-email"
        required
        fullWidth
      />
      <NamesContainer>
        <TextField
          label="First Name"
          placeholder="Enter First Name"
          data-testid="first-name"
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          placeholder="Enter Last Name"
          data-testid="last-name"
          required
          fullWidth
        />
      </NamesContainer>
    </Container>
  );
};
