import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

import { EMAIL_PATTERN } from "src/constants";
import { TCheckIfUserExistsRequest, userApiService } from "src/api/user";
import { useDebounce } from "src/shared/hooks";

import { Container, NamesContainer } from "./user-fields.styles";
import { isApiError } from "../../../../../../shared/utils";

export interface IUserFieldsProps {
  title: string;
  "data-testid": string;
}

export const UserFields: React.FC<IUserFieldsProps> = ({ title, "data-testid": testId }) => {
  const debounce = useDebounce(300);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [search, setSearch] = useState("");

  const handleCheckIfUserExists = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    debounce(async () => {
      const isEmail = EMAIL_PATTERN.test(event.target.value);
      await handleProcessCheckUser({
        email: isEmail ? event.target.value : undefined,
        phone: isEmail ? undefined : event.target.value,
      });
    });
  };

  const handleProcessCheckUser = async (data: TCheckIfUserExistsRequest) => {
    try {
      const response = await userApiService.checkIfUserExists(data);

      setName(response.firstName);
      setLastName(response.lastName);
    } catch (e) {
      if (e instanceof XMLHttpRequest && e.status === 404) return;
      console.error(e);
    }
  };

  return (
    <Container data-testid={testId}>
      <Typography>{title}</Typography>
      <TextField
        value={search}
        label="Phone number or email"
        placeholder="Enter phone number or email"
        data-testid="phone-or-email"
        onChange={handleCheckIfUserExists}
        required
        fullWidth
      />
      <NamesContainer>
        <TextField
          value={name}
          label="First Name"
          placeholder="Enter First Name"
          data-testid="first-name"
          required
          fullWidth
        />
        <TextField
          value={lastName}
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
