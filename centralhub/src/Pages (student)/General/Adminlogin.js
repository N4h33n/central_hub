import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { Redirect } from "react-router-dom";

const BASE_URL = 'http://localhost:5000/';

export default class Adminlogin extends Component {
  handleClick = async () => {
    const email = document.getElementById("outlined-email").value;
    const password = document.getElementById("outlined-password").value;

    const response = await fetch(${BASE_URL}/api/adminlogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
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
