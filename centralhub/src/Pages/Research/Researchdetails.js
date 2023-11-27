import * as React from "react";
import Listedinfo from "../Components/Listedinfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

//TODO-url params and set object

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

export default function Researchdetails() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section className="mainSection">
      <div className="m-5">
        <Listedinfo
          information={courseInformation}
          title={"Research Details"}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Request to Join Project
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="w-100"
              style={{
                textAlign: "center",
                background: "#ffffed",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Why do you think you'd be a good fit?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  defaultValue="..."
                />
              </Typography>
              <Button className="m-3" variant="outlined">
                Send Request
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </section>
  );
}
