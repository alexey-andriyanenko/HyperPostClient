import React from "react";
import { Typography } from "@mui/material";

import { PageContent } from "src/shared/components/layout";
import { Form } from "./form";

const Profile: React.FC = () => {
  return (
    <PageContent>
      <Typography variant="h3"> Profile </Typography>

      <Form />
    </PageContent>
  );
};

export default Profile;
