import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import { useNavigate } from "react-router-dom";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import axios from "axios";

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
        GoSports
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Feedback = () => {
  const history = useNavigate();

  const [Feedback, setFeedback] = useState("");

  const validateFeedback = (e) => {
    const feedback = e.target.value;
    if (feedback === "") {
      alert("Please provide a valid feedback");
    }
    setFeedback(feedback);
  };

  const validateSubmit = (props) => {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy",
    };

    axios
      .post(
        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/polarity",
        { booking_id: localStorage.getItem("bookingid"), Feedback: Feedback }
      )
      .then(function (response) {
        console.log(response);
        alert("Feed back submitted Successfully");
        history("/rooms");
      })
      .catch(function (error) {
        console.log(error);
        alert("Internal server error");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={10} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                my: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <RoomServiceSharpIcon
                    color="primary"
                    sx={{
                      display: { xs: "none", md: "flex" },
                      mr: 4,
                    }}
                    fontSize="large"
                  />
                </Grid>
                &nbsp; &nbsp;
                <Grid item>
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    color="primary"
                    href="/"
                    sx={{
                      mr: 0,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",

                      textDecoration: "none",
                    }}
                  >
                    Serverless B&B Feedback
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">Feedback</Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Type your feedback here"
                style={{ width: 200 }}
                value={Feedback}
                onChange={validateFeedback}
              />
            </Box>

            <br />
            <br />
            <Box>
              <Button
                variant="contained"
                onClick={validateSubmit}
                color="primary"
                sx={{ height: 40 }}
              >
                Submit
              </Button>
              <br />
              <br /><br />
              <Button
                variant="contained"
                onClick={() => history("/rooms")}
                color="primary"
                sx={{ height: 40 }}
              >
                Home
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/IS5550X7el0)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Feedback;
