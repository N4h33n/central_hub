import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { Redirect } from "react-router-dom";

export default class Adminlogin extends Component {
  data = { success: true };

  handleClick = () => {
    if (this.data.success) {
      window.location.href = "/studentlist";
    } else {
      document.getElementById("outlined-email").value = "";
      document.getElementById("outlined-password").value = "";
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="loginInfo">
          <h1 style={{ color: "#1976d2" }}>Admin Login</h1>
          <TextField
            className="loginput d-block m-5"
            id="outlined-email"
            label="Email"
            variant="outlined"
          />
          <TextField
            className="loginput d-block m-5"
            id="outlined-password"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button
            onClick={this.handleClick}
            className="loginput d-block m-auto"
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}
