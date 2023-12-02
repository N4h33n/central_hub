import { Button, TextField } from "@mui/material";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Studentlogin extends Component {
  student = [{ ucid: "30134608" }];

  data = { success: true };

  handleClick = () => {
    if (this.data.success) {
      window.location.href = `/dashboard/:${this.student[0].ucid}`;
    } else {
      document.getElementById("outlined-email").value = "";
      document.getElementById("outlined-password").value = "";
    }
  };
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
