import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

// Listedinfo component
export default function Listedinfo({ information, title }) {
  // Check if information is an array
  if (!Array.isArray(information)) {
    return <p>No information available</p>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {information.map((info, index) => (
          <li key={index}>
            {/* Display properties of each faculty object */}
            {Object.entries(info).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
