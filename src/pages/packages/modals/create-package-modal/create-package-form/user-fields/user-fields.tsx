import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

import { EMAIL_PATTERN } from "src/constants";
import { TCheckIfUserExistsRequest, userApiService } from "src/api/user";
import { useDebounce } from "src/shared/hooks";

import { Container, NamesContainer } from "./user-fields.styles";
import { useController, useFormContext } from "react-hook-form";
import { ICreatePackageForm } from "../create-package-form.types";

export interface IUserFieldsProps {
  name: "senderUserId" | "receiverUserId";
  title: string;
  "data-testid": string;
}

export const UserFields: React.FC<IUserFieldsProps> = ({ name, title, "data-testid": testId }) => {
  const debounce = useDebounce(300);

  const { control } = useFormContext<ICreatePackageForm>();
  const { field } = useController({
    name,
    control,
  });

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
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

      setUserName(response.firstName);
      setUserLastName(response.lastName);

      field.onChange(response.id);
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
          value={userName}
          label="First Name"
          placeholder="Enter First Name"
          data-testid="first-name"
          required
          fullWidth
        />
        <TextField
          value={userLastName}
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
