import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import GoBack from "../GoBack";

export default function Adminlanding() {
  return (
    <>
      <GoBack text={"🢀 Logout"} link={`/adminlogin`} />
      <div className="loginContainer">
        <Button variant="contained" className="loginButton d-block m-5">
          <Link className="link" to={`/studentlist/`}>
            Students
          </Link>
        </Button>
        <Button variant="contained" className="loginButton d-block m-5">
          <Link className="link" to={`/courselist`}>
            Courses
          </Link>
        </Button>
        <Button variant="contained" className="loginButton d-block m-5">
          <Link className="link" to={`/clublist/`}>
            Clubs
          </Link>
        </Button>
        <Button variant="contained" className="loginButton d-block m-5">
          <Link className="link" to={`/researchlanding/`}>
            Research
          </Link>
        </Button>
      </div>
    </>
  );
}
