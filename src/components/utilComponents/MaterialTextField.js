import React, { useState } from "react";
import { TextField } from "@mui/material";


const MaterialTextField = (props) => {
  let [textValue, changeTextValue] = useState();

  const { input, children, initialValues, ...custom } = props;
  return (
    <TextField
      value={
        textValue
          ? textValue
          : initialValues?.[input.name]
            ? initialValues[input.name]
            : ""
      }
      onChange={(e) => changeTextValue(e.currentTarget.value)}
      {...custom}
      {...input}
    >
      {children}
    </TextField>
  );
};

export default MaterialTextField;
