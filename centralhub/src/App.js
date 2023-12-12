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
import Addstudent from "./Pages (admin)/Addstudent";
import Updatepersonalinfo from "./Pages (admin)/Updatepersonalinfo";
import Addtocourse from "./Pages (admin)/Addtocourse";
import Editassignmentgrade from "./Pages (admin)/Editassignmentgrade";
import Editexamgrade from "./Pages (admin)/Editexamgrade";
import Studentdashboard from "./Pages (student)/Studentdashboard";
import Filtercourses from "./Pages (student)/Course/Filtercourses";
import Explorecourses from "./Pages (student)/Course/Explorecourses";
import DiscoverECA from "./Pages (student)/ECA/DiscoverECA";
import Exploreresearch from "./Pages (student)/Research/Exploreresearch";
import Adminlanding from "./Pages (admin)/Adminlanding";
import Courselist from "./Pages (admin)/Courses/Courselist";
import Researchlanding from "./Pages (admin)/Research/Researchlanding";
import Pastresearchlist from "./Pages (admin)/Research/Pastresearchlist";
import Currentresearchlist from "./Pages (admin)/Research/Currentresearchlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/" element={<Landing />}></Route>
          <Route path="studentlogin" element={<Studentlogin />}></Route>
          <Route path="adminlogin" element={<Adminlogin />}></Route>
          <Route path="adminlanding" element={<Adminlanding />}></Route>
          <Route path="courselist" element={<Courselist />}></Route>
          <Route path="researchlanding" element={<Researchlanding />}></Route>
          <Route
            path="pastresearchadmin"
            element={<Pastresearchlist />}
          ></Route>
          <Route
            path="currentresearchadmin"
            element={<Currentresearchlist />}
          ></Route>
          <Route
            path="dashboard/:studentID"
            element={<Studentdashboard />}
          ></Route>
          <Route
            path="enrolledcoursedetails/:studentID/:courseID"
            element={<Viewspecificcourse />}
          ></Route>
          <Route
            path="viewcourses/:studentID"
            element={<Viewcourses />}
          ></Route>
          <Route path="explorecourses/" element={<Explorecourses />}></Route>
          <Route
            path="coursedetails/:courseID"
            element={<Coursedetails />}
          ></Route>

          <Route
            path="enrolledeca/:studentID"
            element={<ViewenrolledECA />}
          ></Route>
          <Route path="viewecas/:ecaname" element={<ECAdetails />}></Route>
          <Route path="research/:studentID" element={<Research />}></Route>
          <Route
            path="enrolledresearch/:studentID"
            element={<Enrolledresearch />}
          ></Route>
          <Route path="pastresearch" element={<Pastresearch />} />

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
          <Route
            path="exploreresearch/:studentID"
            element={<Exploreresearch />}
          ></Route>
          <Route path="faculty/:facultyID" element={<Facultyinfo />}></Route>
          <Route path="updateinfo/:studentID" element={<Updateinfo />}></Route>
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
          <Route
            path="/updatepersonalinfo/:studentID"
            element={<Updatepersonalinfo />}
          ></Route>
          <Route
            path="/addtocourse/:studentID"
            element={<Addtocourse />}
          ></Route>
          <Route
            path="/editassignmentgrade/:studentID/:courseID"
            element={<Editassignmentgrade />}
          ></Route>
          <Route
            path="/editexamgrade/:studentID/:courseID"
            element={<Editexamgrade />}
          ></Route>
          <Route path="/filtercourses" element={<Filtercourses />}></Route>
          <Route
            path="/discoverecas/:studentID"
            element={<DiscoverECA />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
