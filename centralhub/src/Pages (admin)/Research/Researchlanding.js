import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Researchlanding() {
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to={`/pastresearchadmin/`}>
          Past Research
        </Link>
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to={`/currentresearchadmin/`}>
          Ongoing Research
        </Link>
      </Button>
    </div>
  );
}
