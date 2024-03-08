import React from "react";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear the history stack when the component mounts
    navigate("/", { replace: false });
  }, [navigate]);
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        <Link
          style={{ color: "white", fontWeight: "bold" }}
          className="link"
          to="/studentlogin"
        >
          Student Login
        </Link>
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        <Link
          style={{ color: "white", fontWeight: "bold" }}
          className="link"
          to="/adminlogin"
        >
          Admin Login
        </Link>
      </Button>
    </div>
  );
}
