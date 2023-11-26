import { Button, TextField } from "@mui/material";
import React, { Component } from "react";

export default class Studentlogin extends Component {
  render() {
    return (
      <div className="loginContainer">
        <div className="loginInfo">
          <h1 style={{ color: "#1976d2" }}>Student Login</h1>
          <TextField
            className="loginput d-block m-5"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className="loginput d-block m-5"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button className="loginput d-block m-auto" variant="contained">
            Login
          </Button>
        </div>
      </div>
    );
  }
}
