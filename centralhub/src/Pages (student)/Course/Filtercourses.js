import React from "react";
import Placeholdertable from "../Placeholdertable";

export default function Filtercourses() {
  return (
    <>
      <div className="d-inline-block w-75" style={{ textAlign: "center" }}>
        <h1 className="m-4">Courses</h1>
        <div className="m-4">
          <Placeholdertable />
        </div>
      </div>
    </>
  );
}
