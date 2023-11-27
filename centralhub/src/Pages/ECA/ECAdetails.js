import React from "react";
import Listedinfo from "../Components/Listedinfo";
import { Button } from "@mui/material";

//TODO-URL param stuff
//TODO-roles thing
//TODO-club images
//TODO-button depends whether you're already in the club or not

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

// const imgList = [
//   "https://csweb.rice.edu/sites/g/files/bxs4941/files/2020-08/yatesHSweb.jpg",
//   "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.defense.gov%2F2020%2FFeb%2F27%2F2002256414%2F-1%2F-1%2F0%2F200212-F-HC101-1002.JPG&tbnid=Kn6z0xI9mRQThM&vet=12ahUKEwjwhKK0-uKCAxWjIjQIHeRPC7sQMygBegQIARBx..i&imgrefurl=https%3A%2F%2Fwww.edwards.af.mil%2FNews%2FArticle%2F2096907%2Fedwards-robotics-teams-succeed-at-competition-stem-outreach%2F&docid=EhFkmpcy4kAC-M&w=3417&h=2441&q=robotics%20club&ved=2ahUKEwjwhKK0-uKCAxWjIjQIHeRPC7sQMygBegQIARBx",
//   "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcsweb.rice.edu%2Fsites%2Fg%2Ffiles%2Fbxs4941%2Ffiles%2F2020-08%2FyatesHSweb.jpg&tbnid=RfN05d-lVbC6AM&vet=12ahUKEwjwhKK0-uKCAxWjIjQIHeRPC7sQMygAegQIARBv..i&imgrefurl=https%3A%2F%2Fcsweb.rice.edu%2Fnews%2Fstudent-mentors-needed-yates-high-school-robotics-club&docid=qjdktaokBcJgZM&w=745&h=418&q=robotics%20club&ved=2ahUKEwjwhKK0-uKCAxWjIjQIHeRPC7sQMygAegQIARBv",
// ];

export default function ECAdetails() {
  return (
    <section>
      <div className="d-inline-block m-5" style={{ textAlign: "center" }}>
        <Listedinfo information={courseInformation} title={"Club Details"} />
        <div style={{ textAlign: "center" }}>
          <Button variant="contained">Join Club</Button>
        </div>
      </div>
      {/* <div className="d-inline-block border border-black">
        {imgList.map((img) => {
          return <img src={img} />;
        })}
      </div> */}
    </section>
  );
}
