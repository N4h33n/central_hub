import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/General/Landing";
import Studentlogin from "./Pages/General/Studentlogin";
import Adminlogin from "./Pages/General/Adminlogin";
import Viewcourses from "./Pages/Course/Viewcourses";
import Viewspecificcourse from "./Pages/Course/Viewspecificcourse";
import Coursedetails from "./Pages/Course/Coursedetails";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
