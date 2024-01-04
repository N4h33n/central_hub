import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import Placeholdertable from "../Placeholdertable";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "http://localhost:5000/";

export default function Enrolledresearch() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [research, setResearch] = useState([]);

  const loadResearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledresearch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const research = await response.json();
      setResearch(research);
      console.log(research);
    } catch (error) {}
  };

  useEffect(() => {
    loadResearch();
  }, []);

  return (
    <section className="mainSection">
      <h2 className="title m-5">ENROLLED RESEARCH</h2>
      <section className="m-4">
        <Placeholdertable data={research} />
        <Button variant="contained" size="large" className="m-5">
          <Link className="link" to={`/exploreresearch/${studentID}`}>
            Explore Research Opportunities ⌕
          </Link>
        </Button>
      </section>
    </section>
  );
}
