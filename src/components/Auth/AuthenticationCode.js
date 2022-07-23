import * as React from "react";
import { useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import { useLocaleText } from "@mui/x-date-pickers/internals";
import axios from 'axios';

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

const AuthenticationCode = () => {
    const location = useLocation();
    const history = useNavigate();
    const [Code, setCode] = useState('');
    var Email = location.state.EMAIL
    var UserName = location.state.userName
    const validCode = (e)=>{
        const code = e.target.value;

        setCode(code)

    }
    const validateResend = () =>{
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy'
      }
        axios.post('https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/resendverificationcode', {
            username: location.state.EMAIL,
          },{
            headers: headers
          })
          .then(function (response) {
            console.log(response); 
             
          })
          .catch(function (error) {
            console.log(error);
            
          });

    }
    const validateSubmit = () =>{
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy'
      }
        axios.post('https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/verification', {
            username: location.state.EMAIL,
            code: Code
            
          },{headers: headers})
          .then(function (response) {
            console.log(response);
            history('/Security',{state:{EMAIL: Email, userName: UserName}});
            
          })
          .catch(function (error) {
            alert("Invalid Code")
            console.log(error);
          });

    }
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
                    Serverless B&B Authentication Code
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">Authentication Code</Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Authentication Code"
                name="email"
                onChange={validCode}
                autoComplete="off"
              />
            </Box>
            <br />
            <br />
        
            <br />
            <br />
            <Box>
              <Button variant="contained" color="primary" onClick={validateSubmit} sx={{ height: 40 }}>
                Submit
              </Button>
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={validateResend} sx={{ height: 40 }}>
                Resend Code
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

export default AuthenticationCode;
