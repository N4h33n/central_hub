import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/General/Landing";
import Studentlogin from "./Pages/General/Studentlogin";
import Adminlogin from "./Pages/General/Adminlogin";
import Viewcourses from "./Pages/Course/Viewcourses";
import Viewspecificcourse from "./Pages/Course/Viewspecificcourse";
import Coursedetails from "./Pages/Course/Coursedetails";
import ViewenrolledECA from "./Pages/ECA/ViewenrolledECA";
import ECAdetails from "./Pages/ECA/ECAdetails";
import Research from "./Pages/Research/Research";
import Enrolledresearch from "./Pages/Research/Enrolledresearch";
import Pastresearch from "./Pages/Research/Pastresearch";
import Researchdetails from "./Pages/Research/Researchdetails";
import Pastresearchdetails from "./Pages/Research/Pastresearch";

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
            element={<Pastresearchdetailsesearchdetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
