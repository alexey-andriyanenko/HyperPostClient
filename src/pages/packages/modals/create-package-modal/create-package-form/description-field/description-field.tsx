import React, { useState } from "react";
import { TextField } from "@mui/material";

export const DescriptionField: React.FC = () => {
  const [description, setDescription] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 150) return;
    setDescription(event.target.value);
  };

  return (
    <TextField
      value={description}
      label="Package Description"
      placeholder="Enter Package Description"
      data-testid="description"
      multiline
      onChange={handleChange}
    />
  );
};
