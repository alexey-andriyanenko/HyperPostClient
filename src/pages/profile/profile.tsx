import React from "react";
import { Typography } from "@mui/material";

// NOTE: if importing from layout/index.ts is will
// cause ReferenceError: Cannot access _default before initialization
import { PageContent } from "src/shared/components/layout/page-content";
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
