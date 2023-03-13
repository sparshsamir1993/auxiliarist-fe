import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const MaterialSelect = (props) => {
  let [iVal, setIVal] = useState("");
  const {
    input,
    label,
    meta: { touched, error },
    children,
    initialValues,
    ...custom
  } = props;
  return (
    <FormControl error={touched && error} className={".w100"}>
      <InputLabel htmlFor="role-native-simple">{label}</InputLabel>
      <Select
        native
        {...input}
        value={
          iVal
            ? iVal
            : initialValues?.[input.name]
              ? initialValues[input.name]
              : ""
        }
        onChange={(e) => {
          setIVal(e.currentTarget.value);
        }}
        inputProps={{
          name: "role",
          id: "role-native-simple",
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

export default MaterialSelect;
