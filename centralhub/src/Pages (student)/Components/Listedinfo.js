import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function Listedinfo({
  title,
  information,
  linkTitle,
  facultyUrl,
}) {
  return (
    <div
      style={{ textAlign: "center", verticalAlign: "top" }}
      className="d-inline-block"
    >
      <h4> {title} </h4>
      <List
        style={{ backgroundColor: "rgb(230, 227, 206)" }}
        sx={{ width: "100%", maxWidth: 360 }}
      >
        {information.map((info, index) => (
          <ListItem key={index} style={{ display: "block" }}>
            {Object.keys(info).map((field) => (
              <ListItemText
                key={field}
                primary={field}
                secondary={info[field]}
              />
            ))}
          </ListItem>
        ))}
      </List>
      <Link href={facultyUrl}>{linkTitle}</Link>
    </div>
  );
}
