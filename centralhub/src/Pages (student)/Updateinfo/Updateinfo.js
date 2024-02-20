import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000/";

export default function Updateinfo() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [student, setStudent] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editNumber, setEditNumber] = useState(false);
  const [editAddy, setEditAddy] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/studentinfodefault`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ucid,
          }),
        });

        const studentData = await response.json();
        setStudent(studentData[0]);
        setName(studentData[0].name);
        setEmail(studentData[0].email);
      } catch (error) {
        console.error("Error loading student:", error);
      }
    };

    loadStudent();
  }, [ucid]);

  const handleChange = (field, value) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleToggleEdit = (field) => {
    switch (field) {
      case "phone":
        setEditNumber(!editNumber);
        break;
      case "address":
        setEditAddy(!editAddy);
        break;
      case "passhash":
        setEditPassword(!editPassword);
        break;
      default:
        break;
    }
  };

  const handleClick = async () => {
    const { passhash, phone, address } = student;

    if (address.length < 3) {
      alert("Address must be a minimum of 3 characters.");
      return;
    }

    if (passhash.length < 6) {
      alert("Password must be a minimum of 6 characters.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      alert("Phone must be exactly 10 digits (no strings).");
      return;
    }

    const response = await fetch(`${BASE_URL}/api/updateinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passhash,
        telephone: phone,
        address,
        ucid,
      }),
    });

    const data = await response.json();
  };

  return (
    <section className="mainSection">
      <h2 className="m-5">Update Information</h2>
      <div id="imContainer" className="mb-5">
        <div id="profImage" className=" d-inline-block"></div>
        <div>
          <Button className="" variant="contained">
            Edit Image
          </Button>
        </div>
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="name"
          label="Name"
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="email"
          label="Email"
          value={email}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="ucid"
          label="UCID Number"
          defaultValue={ucid}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4 editable">
        <TextField
          style={{ width: "20%" }}
          required
          id="phonenumber"
          label="Telephone Number"
          value={student.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          InputProps={{
            readOnly: !editNumber,
          }}
        />
        <div
          className="d-inline-block"
          style={{ verticalAlign: "bottom", cursor: "pointer" }}
          onClick={() => handleToggleEdit("phone")}
        >
          <button className="editPen d-inline-block">
            {editNumber ? "✅" : "✎"}
          </button>
        </div>
      </div>

      <div className="m-4 editable">
        <TextField
          style={{ width: "20%" }}
          required
          id="address"
          label="Address"
          value={student.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          InputProps={{
            readOnly: !editAddy,
          }}
        />
        <div
          className="d-inline-block"
          style={{ verticalAlign: "bottom", cursor: "pointer" }}
          onClick={() => handleToggleEdit("address")}
        >
          <button className="editPen d-inline-block">
            {editAddy ? "✅" : "✎"}
          </button>
        </div>
      </div>

      <div className="m-4 editable">
        <TextField
          style={{ width: "20%" }}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={student.passhash || ""}
          onChange={(e) => handleChange("passhash", e.target.value)}
          InputProps={{
            readOnly: !editPassword,
          }}
        />
        <div
          className="d-inline-block"
          style={{ verticalAlign: "bottom", cursor: "pointer" }}
          onClick={() => handleToggleEdit("passhash")}
        >
          <button className="editPen d-inline-block">
            {editPassword ? "✅" : "✎"}
          </button>
        </div>
      </div>
      <Button className="m-3" variant="contained" onClick={handleClick}>
        Update
      </Button>
    </section>
  );
}
