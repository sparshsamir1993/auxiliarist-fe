import React from "react";
import { TextField } from "@mui/material";

export const FormField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
      id="outlined-basic"
      error={touched && error}
      label={label}
      variant="outlined"
      {...input}
      {...custom}
    />
  );
};
