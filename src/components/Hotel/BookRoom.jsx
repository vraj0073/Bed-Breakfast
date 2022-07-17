import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";

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

const BookRoom = () => {
  const [value, setValue] = React.useState([null, null]);
  const [name, setName] = React.useState("");
  const [checkInDate, setCheckInDate] = React.useState("");
  const [checkOutDate, setCheckOutDate] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [people, setPeople] = React.useState(0);
  const [numberOfRooms, setNumberOfRooms] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    setCheckInDate(value[0].toISOString().slice(0, 10));
    setCheckOutDate(value[1].toISOString().slice(0, 10));

    console.log(name);
    console.log(value[0].toISOString().slice(0, 10));
    console.log(value[1].toISOString().slice(0, 10));
    console.log(phone);
    console.log(people);
    console.log(numberOfRooms);

    const payload = {};
    payload["MobileNo"] = phone;
    payload["TotalPeople"] = people;
    payload["BookingByName"] = name;
    payload["BookingTo"] = value[0].toISOString().slice(0, 10);
    payload["BookingFrom"] = value[1].toISOString().slice(0, 10);
    payload["TotalRooms"] = numberOfRooms;

    const data = {};
    data["type"] = "booking";
    data["payload"] = payload;

    axios({
      method: "post",
      url: "https://mpd7tsd5bd.execute-api.us-east-1.amazonaws.com/dev/api/booking",
      data: data,
    }).then(() => {
      console.log("Booking confirmed!");
    });
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
