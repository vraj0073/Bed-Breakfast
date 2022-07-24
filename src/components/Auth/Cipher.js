import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import { useLocation, useNavigate } from "react-router-dom";
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

const Cipher = () => {
  const [Cipher, setCipher] = useState();
  const [Type, setType] = useState();
  const [CipherAnswer, setCipherAnswer] = useState();
  const location = useLocation();
  const history = useNavigate();
  var Email = location.state.EMAIL;
  var UserName = location.state.userName;
  var Answer = location.state.answer;

  useEffect(() => {
    const myArray = ["cipher", "plain"];
    var randomType = myArray[Math.floor(Math.random() * myArray.length)];
    setType(randomType);
    console.log(randomType);
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    var charactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCipher(result);
  }, []);

  const validAnswer = (e) => {
    const userAnswer = e.target.value;

    setCipherAnswer(userAnswer);
  };

  const validSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy",
      "Auth": location.state.IdToken
    };
    console.log("Type = ",Type);
    axios
      .post(
        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/gcp-auth",
        {
          username: UserName,
          type: Type,
          text: Cipher,
          caesarAns: CipherAnswer,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
        localStorage.setItem("username", UserName);
        localStorage.setItem("email", Email);
        alert("Login Sucessful");
        history("/rooms");   
      })
      .catch(function (error) {
        console.log(error);
        alert("Wrong Answer");
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
                    Serverless B&B Cipher
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">
                Use the code given to you during registration process to solve
                it Your {Type} is : {Cipher}
              </Typography>
              <TextField
                margin="normal"
                required
                id="email"
                label="Cipher Answer"
                name="email"
                onChange={validAnswer}
                autoComplete="off"
              />
            </Box>

            <br />
            <br />
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={validSubmit}
                sx={{ height: 40 }}
              >
                Submit
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
    </ThemeProvider>
  );
};

export default Cipher;
