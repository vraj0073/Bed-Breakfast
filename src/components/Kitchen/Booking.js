import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

import { Select } from "@mui/material";

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

const Booking = () => {
  const location = useLocation();
  const history = useNavigate();
  const [Menu, SetMenu] = useState();
  const [Quantity, SetQuantity] = useState();
  const [Time, SetTime] = useState();

  React.useEffect(() => {
    if(!localStorage.getItem("token")) {
      history("/login");
    }
  }, []);

  const handleMenu = (e) => {
    const order = e.target.value;
    SetMenu(order);
  };

  let [showChat, setShowChat] = useState(false);
  const startChat = () => {
    setShowChat(true);
  };
  const hideChat = () => {
    setShowChat(false);
  };

  const handleChange = (e) => {
    const qu = e.target.value;
    console.log(qu);
    SetQuantity(qu);
  };
  const handleTime = (e) => {
    const time = e.target.value;
    console.log(time);
    SetTime(time);
  };

  const validateOrder = () => {
    if(Menu != null && Quantity != null && Time != null) {

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy",
        Auth: localStorage.getItem("token"),
      };
      axios
      .post(
        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/kitchen",
        {
          item: Menu,
          qty: Quantity,
          day: Time,
          bookingId: localStorage.getItem("bookingid"), // localStorage.getItem("bookingId")
        },
        { headers: headers }
        )
        .then(function (response) {
          console.log(response);
          const message = response.data["message"];
          alert(message);
          history("/rooms");
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        alert("Please select valid order details");
      }
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
                    Serverless B&B Menu
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <h2>Iteams Available</h2>
              <h2 style={{fontWeight: "normal", margin: 0}}>pancakes - $10</h2>
              <h2 style={{fontWeight: "normal", margin: 0}}>oatmeal - $4</h2>
              <h2 style={{fontWeight: "normal", margin: 0}}>sandwich - $7</h2>
              <h2 style={{fontWeight: "normal", margin: 0}}>coffee - $3</h2>
              <h2 style={{fontWeight: "normal", margin: 0}}>bread-butter - $5</h2>
            </Box>
            <br />
            <br />
            <Box>
              <div>
                <Typography variant="body1">Select Item</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleMenu}
                  label="Quantity"
                  style={{width: "20%", margin: "1%"}}
                >
                  <MenuItem value={"pancakes"}>pancakes</MenuItem>
                  <MenuItem value={"oatmeal"}>oatmeal</MenuItem>
                  <MenuItem value={"sandwich"}>sandwich</MenuItem>
                  <MenuItem value={"bread-butter"}>bread-butter</MenuItem>
                  <MenuItem value={"coffee"}>coffee</MenuItem>
                </Select>
              </div>
              <div>
                <Typography variant="body1">Quantity</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  label="Quantity"
                  style={{width: "20%", margin: "1%"}}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </div>
              <div>
                <Typography variant="body1">Day</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleTime}
                  label="Quantity"
                  style={{width: "20%", margin: "1%"}}
                >
                  <MenuItem value={"today"}>Today</MenuItem>
                  <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
                </Select>
              </div>
            </Box>
            <br />
            <br />
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={validateOrder}
                sx={{ height: 40 }}
              >
                Order
              </Button>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                href="/rooms"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Home
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
};

export default Booking;
