import React from "react";
import { Button } from "@mui/material";

export default function GoBack({ text, link }) {
  function redirect() {
    window.location.href = link;
  }
  return (
    <Button
      className="mt-5 ms-5"
      variant="contained"
      style={{ backgroundColor: "#b79a7f42" }}
      onClick={redirect}
    >
      {text}
    </Button>
  );
}
