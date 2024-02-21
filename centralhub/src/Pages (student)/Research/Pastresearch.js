import { React, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Placeholdertable from "../Placeholdertable";
import { useParams } from "react-router-dom";

//TODO-pastresearchpublished paper- new attribute

const BASE_URL = "http://localhost:5000/";

export default function Pastresearch() {
  const [research, setResearch] = useState([]);

  const loadResearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/pastresearch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
    <>
      {/* <GoBack text={"🢀 Research Homepage"} link={`/research/${studentID}`} /> */}
      <section className="mainSection">
        <section className="m-4">
          <h2 className="title m-5">PAST RESEARCH</h2>
          <Placeholdertable data={research} />
          <Button variant="contained" size="large" className="m-5">
            Explore Research Opportunities ⌕
          </Button>
        </section>
      </section>
    </>
  );
}
