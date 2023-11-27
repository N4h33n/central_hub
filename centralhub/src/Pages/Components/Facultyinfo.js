import React from "react";
import Listedinfo from "./Listedinfo";

//TODO-Edit image url and object from urlparam
//TODO- Copy email automatically?

const courseInformation = [
  {
    label: "Introduction to Web Development",
    details: "lorem ipsum smn smn smn",
  },
  {
    label: "Introduction to Web Development",
    details: "lorem ipsum smn smn smn",
  },
];

const image =
  "https://cms.forbesafrica.com/wp-content/uploads/2023/10/instagram-daily-2023-10-01T183433.735.png";

export default function Facultyinfo() {
  return (
    <section className="mainSection mt-5">
      <div style={{ verticalAlign: "top" }} className="d-inline-block m-5">
        <Listedinfo
          information={courseInformation}
          title={"Faculty Member Details"}
        />
      </div>
      <img
        style={{ verticalAlign: "top" }}
        id="facultyImage"
        className="m-5 border border-black border-5"
        src={image}
      />
    </section>
  );
}
