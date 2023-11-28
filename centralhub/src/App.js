import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages (student)/General/Landing";
import Studentlogin from "./Pages (student)/General/Studentlogin";
import Adminlogin from "./Pages (student)/General/Adminlogin";
import Viewcourses from "./Pages (student)/Course/Viewcourses";
import Viewspecificcourse from "./Pages (student)/Course/Viewspecificcourse";
import Coursedetails from "./Pages (student)/Course/Coursedetails";
import ViewenrolledECA from "./Pages (student)/ECA/ViewenrolledECA";
import ECAdetails from "./Pages (student)/ECA/ECAdetails";
import Research from "./Pages (student)/Research/Research";
import Enrolledresearch from "./Pages (student)/Research/Enrolledresearch";
import Pastresearch from "./Pages (student)/Research/Pastresearch";
import Researchdetails from "./Pages (student)/Research/Researchdetails";
import Pastresearchdetails from "./Pages (student)/Research/Pastresearchdetails";
import Facultyinfo from "./Pages (student)/Components/Facultyinfo";
import Updateinfo from "./Pages (student)/Updateinfo/Updateinfo";
import Studentlist from "./Pages (admin)/Studentlist";
import Updatestudentinfo from "./Pages (admin)/Updatestudentinfo";
import Updatecoursecomp from "./Pages (admin)/Updatecoursecomp";
import Addstudent

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="studentlogin" element={<Studentlogin />}></Route>
          <Route path="adminlogin" element={<Adminlogin />}></Route>
          <Route path="viewcourses" element={<Viewcourses />}></Route>
          <Route
            path="viewcourses/:courseID"
            element={<Viewspecificcourse />}
          ></Route>
          <Route
            path="explorecourses/:courseID"
            element={<Coursedetails />}
          ></Route>
          <Route path="enrolledeca" element={<ViewenrolledECA />}></Route>
          <Route path="viewecas/:ecaname" element={<ECAdetails />}></Route>
          <Route path="research" element={<Research />}></Route>
          <Route path="enrolledresearch" element={<Enrolledresearch />}></Route>
          <Route path="pastresearch" element={<Pastresearch />}></Route>
          <Route
            path="currentresearchdetails/:researchID"
            element={<Researchdetails />}
          ></Route>
          <Route
            path="currentresearchdetails/:researchID"
            element={<Researchdetails />}
          ></Route>
          <Route
            path="pastresearchdetails/:researchID"
            element={<Pastresearchdetails />}
          ></Route>
          <Route path="faculty/:ID" element={<Facultyinfo />}></Route>
          <Route path="updateinfo" element={<Updateinfo />}></Route>
          <Route path="studentlist" element={<Studentlist />}></Route>
          <Route
            path="studentlist/:studentID"
            element={<Updatestudentinfo />}
          ></Route>
          <Route
            path="updatecoursecomp/:studentID/:courseID"
            element={<Updatecoursecomp />}
          ></Route>
          <Route path="/addstudent" element={<Addstudent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
