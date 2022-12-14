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
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import { useLocation, useNavigate } from 'react-router-dom';
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

const Login = () => {
  const location = useLocation();
    const history = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    let [showChat, setShowChat] = useState(false);
  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }
    const validateEmail = (e) => {
        const email = e.target.value;
    setEmail(email)
    
    }
    const validatePassword = (e) => {
        const password = e.target.value;
    setPassword(password)
    }
    const validateForget =()=>{
        history("/forgetPassword")
    }
    const validateNew =()=>{
      history("/")
    }
    const validateSubmit = () =>{
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy'
      }
        axios.post('https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/login', {
            email: Email,
            password: Password
            
          },{headers:headers})
          .then(function (response) {
            console.log(response);
            var username = response.data['Username']
            var email = response.data['Email']
            var IdToken = response.data.AuthenticationResult['IdToken']
            console.log(IdToken);
            console.log(response.data.AuthenticationResult['AccessToken']);
            localStorage.setItem("token", IdToken);
            localStorage.setItem("accessToken", response.data.AuthenticationResult['AccessToken']);
            history("/SecurityAnswer",{state:{EMAIL: email, userName: username, IdToken: IdToken}})   
          })
          .catch(function (error) {
            console.log(error);
            alert("Invalid Username/Email or Password")
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
                    Serverless B&B Login
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">Email/Username</Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Email / Username"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                autoComplete="off"
              />
            </Box>
            <br />
            <br />
            <Box>
              <Typography variant="body2">Password</Typography>
              <TextField
                margin="normal"
                required
                type={'password'}
                id="password"
                label="Password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="off"
              />
              
            </Box>
            <br />
            <br />
            <Box>
              <Button variant="contained" color="primary" onClick={validateSubmit} sx={{ height: 40 }}>
               login
              </Button>
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={validateForget} color="primary" sx={{ height: 40 }}>
                Forget Password
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={validateNew} color="primary" sx={{ height: 40 }}>
                New User
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
        <div className="botSize"> {showChat ?  <iframe style={{width: "450px", height: "600px"}} src="https://d2caie5x8agj5e.cloudfront.net/index.html" ></iframe> : null} </div>
        <div>
          {!showChat 
            ? <button className="btn" onClick={() => startChat()}>click to chat... </button> 
            : <button className="btn" onClick={() => hideChat()}>click to hide... </button>}
        </div>
      </div> 
    </ThemeProvider>
  );
};

export default Login;
