import React, { useState } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%",
  },
}));

const MaterialTextField = (props) => {
  let [textValue, changeTextValue] = useState();
  const classes = useStyles();

  const { label, input, children, initialValues, ...custom } = props;
  return (
    <TextField
      variant="outlined"
      {...input}
      className={classes.fullWidth}
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
