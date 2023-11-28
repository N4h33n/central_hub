import React from "react";
import { Button } from "@mui/material";

export default function Research() {
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        Enrolled Research
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        Past Research
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        Explore Research
      </Button>
    </div>
  );
}
