import React, { useState } from "react";
import { TextField } from "@mui/material";


const MaterialTextField = (props) => {
  let [textValue, changeTextValue] = useState();

  const { label, input, children, initialValues, ...custom } = props;
  return (
    <TextField
      variant="outlined"
      {...input}
      className="fullWidth"
      label={label}
      value={
        textValue
          ? textValue
          : initialValues?.[input.name]
            ? initialValues[input.name]
            : ""
      }
      onChange={(e) => changeTextValue(e.currentTarget.value)}
      autoComplete="no"
    >
      {children}
    </TextField>
  );
};

export default MaterialTextField;
