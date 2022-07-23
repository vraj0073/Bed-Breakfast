import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Serverless B&B
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const BookRoom = (props) => {
  const [value, setValue] = React.useState([null, null]);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [people, setPeople] = React.useState(0);
  const [numberOfRooms, setNumberOfRooms] = React.useState(0);
  const [userId, setUserId] = React.useState("user1");
  const [open, setOpen] = React.useState(false);
  const [res, setRes] = React.useState({});
  const [roomString, setRoomString] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    setValue([null, null]);
  };
  // Set USER_ID

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {};
    data["Type"] = "booking";
    data["MobileNo"] = phone;
    data["TotalPeople"] = people;
    data["BookingByName"] = name;
    data["BookingFrom"] = value[0].toISOString().slice(0, 10);
    data["BookingTo"] = value[1].toISOString().slice(0, 10);
    // data["TotalRooms"] = parseInt(Math.ceil(parseInt(people) / 3));
    data["TotalRooms"] = numberOfRooms;
    data["userId"] = userId;

    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/rooms/book",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }).then((res) => {
      console.log(res);
      console.log("Booking confirmed!");
      setRes(res["data"]);
      setTimeout(() => {
        setOpen(true);
      }, 500);
    });

    setRoomString(res["data"]["room_string"]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Book a Room
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              autoComplete="off"
              autoFocus
            />

            <br />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              localeText={{ start: "Check-in", end: "Check-out" }}
            >
              <br />
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <br />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              name="phone"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="people"
              label="People"
              name="people"
              onChange={(event) => {
                setPeople(event.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rooms"
              label="Number of Rooms"
              name="rooms"
              onChange={(event) => {
                setNumberOfRooms(event.target.value);
              }}
              autoComplete="off"
            />

            <div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{ sx: { width: "60%", height: "40%" } }}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <CheckCircleIcon color="success" />
                    &nbsp; Booking confirmed! &nbsp;
                  </div>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <br />
                  <Typography gutterBottom>
                    Booking ID : {res["BookingId"]}
                  </Typography>
                  <br />
                  <Typography gutterBottom>
                    Room Number : {res["room_string"]}
                  </Typography>
                </DialogContent>
              </BootstrapDialog>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSubmit}
            >
              Book
            </Button>

            <Button
              href="/rooms"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default BookRoom;
