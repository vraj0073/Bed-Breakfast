import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const theme = createTheme();

export default function Hotel() {
  let [showChat, setShowChat] = useState(false);
  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }
  const history = useNavigate();
  const logout = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy"
    };
    axios
      .post(
        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/logout",
        {
          accessToken: localStorage.getItem("accessToken")
        },
        { headers: headers }
      )
      .then(function (response) {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        alert("Logout successful");

        history("/login");
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

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
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
                    Serverless B&B
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">Total Rooms</Typography>
              <Typography variant="h4">20</Typography>
            </Box>
            <br />
            <br />
            <Box>
              <Typography variant="body2">Check-in Time</Typography>
              <Typography variant="h4">3:00 PM</Typography>
            </Box>
            <br />
            <br />
            <Box sx={{ order: 1 }}>
              <Typography variant="body2">Check-out Time</Typography>
              <Typography variant="h4">12:00 AM</Typography>
            </Box>
            <br />
            <br />
            <Box sx={{ order: 2 }}>
              <Typography variant="body2">Price per Room</Typography>
              <Typography variant="h4">C$ 180</Typography>
            </Box>
            <br />
            <br />
            <Box>
              <Button
                variant="contained"
                href="bookings"
                color="primary"
                sx={{ height: 40 }}
              >
                My Bookings
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                href="book"
                variant="contained"
                color="primary"
                sx={{ height: 40 }}
              >
                Book
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                href="invoice"
                variant="contained"
                color="primary"
                sx={{ height: 40 }}
              >
                Invoice
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
               onClick={logout}
                variant="contained"
                color="primary"
                sx={{ height: 40 }}
              >
                Logout
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
      
      <div className = "bot">
        <div style ={{display: showChat ? "" : "none"}}>
        {/* <iframe src="https://d2caie5x8agj5e.cloudfront.net/index.html"></iframe> */}
        </div>      
        <div className="botSize"> {showChat ?  <iframe style={{width: "450px", height: "600px"}} src="https://d1slt2ls003kt3.cloudfront.net/" ></iframe> : null} </div>
        <div>
          {!showChat 
            ? <button className="btn" onClick={() => startChat()}>click to chat... </button> 
            : <button className="btn" onClick={() => hideChat()}>click to hide... </button>}
        </div>
      </div>  
    </ThemeProvider>
  );
}
