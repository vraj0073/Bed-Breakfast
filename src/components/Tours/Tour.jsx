import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Tour = () => {
  const [value, setValue] = React.useState([null, null]);
  const [name, setName] = React.useState(localStorage.getItem("username"));
  const [email, setEmail] = React.useState(localStorage.getItem("email"));
  const [numberOfPeoples, setNumberOfPeoples] = React.useState("");
  const [tourType, setTourType] = React.useState("");
  const [date, setDate] = React.useState("");
  const [place, setPlace] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {};
    payload["name"] = name;
    payload["email"] = email;
    payload["numberOfPeoples"] = numberOfPeoples;
    payload["tourType"] = tourType;
    payload["date"] = date;
    payload["place"] = "Halifax";

    axios
      .post(
        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/pubsubProducer",
        {
          name,
          email,
          numberOfPeoples,
          tourType,
          date,
          place: "Halifax",
        }
      )
      .then(() => {
        alert("Booking submitted!");
        navigate("/");
      });
  };

  console.log(localStorage.getItem("username"));
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
          <Typography component="h1" variant="h5">
            Book Tour
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
              value={name}
              default={localStorage.getItem("username") || "no"}
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              autoComplete="off"
              autoFocus
            />

            <br />

            <TextField
              margin="normal"
              required
              value={email}
              fullWidth
              id="email"
              label="Email"
              default={localStorage.getItem("email") || ""}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              name="email"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="numberOfPeoples"
              label="Number Of Peoples"
              onChange={(event) => {
                setNumberOfPeoples(event.target.value);
              }}
              name="numberOfPeoples"
              autoComplete="off"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="tourType"
              label="Tour Type"
              onChange={(event) => {
                setTourType(event.target.value);
              }}
              name="tourType"
              autoComplete="off"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
              name="date"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="place"
              value="Halifax"
              disabled
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
              href="/"
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

export default Tour;
