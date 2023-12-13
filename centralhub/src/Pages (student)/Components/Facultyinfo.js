import { React, useState, useEffect } from "react";
import Listedinfo from "./Listedinfo";
import { useParams } from "react-router-dom";

//TODO-Edit image url and object from urlparam
//TODO- Copy email automatically?
//TODO- Add more attributes

const BASE_URL = "http://localhost:5000/";

export default function Facultyinfo() {
  const { facultyID } = useParams();
  const fucid = facultyID;

  const [faculty, setFaculty] = useState([]);
  const [image, setImage] = useState([]);

  const loadFaculty = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/facultyinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fucid,
        }),
      });

      const faculty = await response.json();
      console.log(faculty);
      setFaculty(faculty);
    } catch (error) {}
  };

  const loadImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/facultyimage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fucid,
        }),
      });

      const image = await response.json();
      setImage(image);
      console.log(image);
    } catch (error) {}
  };

  useEffect(() => {
    loadFaculty();
    loadImage();
  }, []);

  return (
    <section className="mainSection mt-5">
      <div style={{ verticalAlign: "top" }} className="d-inline-block m-5">
        <Listedinfo information={faculty} title={"Faculty Member Details"} />
      </div>
      <img
        style={{ verticalAlign: "top" }}
        id="facultyImage"
        className="m-5 border border-black border-5"
        src={image['image']} // Access the image property of the first (and only) object
        alt="Faculty Member"
      />
    </section>
  );
}
