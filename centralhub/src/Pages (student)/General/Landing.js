import React from "react";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate("/studentlogin");
  }

  const handleAdminClick = () => {
    navigate("/adminlogin");
  }
  
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5" onClick={handleStudentClick}>Student Login</Button>
      <Button variant="contained" className="loginButton d-block m-5" onClick={handleAdminClick}>Admin Login</Button>
    </div>
  );
}
