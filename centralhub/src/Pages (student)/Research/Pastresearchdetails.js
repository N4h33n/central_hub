import * as React from "react";
import Listedinfo from "../Components/Listedinfo";

//TODO-url params and set object

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

export default function Pastresearchdetails() {
  return (
    <section className="mainSection">
      <div className="m-5">
        <Listedinfo
          information={courseInformation}
          title={"Research Details"}
        />
      </div>
    </section>
  );
}
