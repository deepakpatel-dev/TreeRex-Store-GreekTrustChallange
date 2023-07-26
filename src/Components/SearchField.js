import React from "react";
import TextField from "@mui/material/TextField";

export default function ({ value, changeValue }) {
  return (
    <TextField
      id="standard-basic"
      label="Search for a products"
      value={value}
      onChange={(e) => {
        changeValue(e.target.value);
      }}
      variant="standard"
    />
  );
}
