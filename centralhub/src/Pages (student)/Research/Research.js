import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Research() {
  const { studentID } = useParams();
  const ucid = studentID;
  console.log(ucid);

  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to={`/enrolledresearch/${studentID}`}>
          Enrolled Research
        </Link>
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to={`/pastresearch`}>
          Past Research
        </Link>
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        Explore Research
      </Button>
    </div>
  );
}
