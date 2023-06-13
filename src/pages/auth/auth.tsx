import React from "react";
import { Container, Avatar, Box, Icon, Button } from "@mui/material";

import { LoginViaEmailForm } from "./login-via-email-form";
import { LoginViaPhoneForm } from "./login-via-phone-form";

import { AuthEnum } from "./auth.types";

const Auth: React.FC = () => {
  const [loginVariant, setLoginVariant] = React.useState<AuthEnum>(AuthEnum.LoginViaEmail);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Icon className="material-symbols-outlined">lock</Icon>
        </Avatar>
      </Box>

      {loginVariant === AuthEnum.LoginViaEmail && <LoginViaEmailForm />}
      {loginVariant === AuthEnum.LoginViaPhone && <LoginViaPhoneForm />}

      {loginVariant === AuthEnum.LoginViaEmail && (
        <Button
          onClick={() => setLoginVariant(AuthEnum.LoginViaPhone)}
          fullWidth
          data-testid="login-via-phone-button"
        >
          Login via phone
        </Button>
      )}

      {loginVariant === AuthEnum.LoginViaPhone && (
        <Button
          onClick={() => setLoginVariant(AuthEnum.LoginViaEmail)}
          fullWidth
          data-testid="login-via-email-button"
        >
          Login via email
        </Button>
      )}
    </Container>
  );
};

export default Auth;
