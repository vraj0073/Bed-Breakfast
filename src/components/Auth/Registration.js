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
import { useNavigate } from "react-router-dom";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
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

const Registration = () => {
    
    const history = useNavigate();
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [Emailmessage, setEmailMessage] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phonemessage, setPhoneMessage] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Passwordmessage, setPasswordMessage] = useState('');
  const [Confirmmessage, setConfirmMessage] = useState('');
  let [showChat, setShowChat] = useState(false);
  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }
  const validateFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname)
    
  };
  const validateLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname)
    
  };
  const validatePhone = (e) =>{
    const phonenumber = e.target.value;
    if(phoneRegex.test(phonenumber) && phonenumber.length > 11){

      setPhonenumber(phonenumber)
      setPhoneMessage(" ");
      
    }
    else {

      setPhoneMessage('Please entre valid mobile number!');
      
    }
  };
  const validateEmail = (e) =>{
    const email = e.target.value;
        if (emailRegex.test(email)) {
        
          setEmail(email)
          setEmailMessage(" ");
         
          
        } else {
          
          setEmailMessage('Please enter a valid email!');
         
        }
  }
  const validaPassword = (e) =>{
    var password = e.target.value;
        window.pass = password;
        if(passwordRegex.test(password) && password.length >= 8 ){
          
          setPasswordMessage(" ");
          setPassword(password)
          
    }
         else{
           
           setPasswordMessage("Invalid Password")
           
         }
  }
  const validateConfirm = (e) =>{
    const confirmPassword = e.target.value;
        if(confirmPassword === window.pass){
          
          
          setConfirmMessage("Password Match");
         }
         else{
          
           
           setConfirmMessage("confirm password does not match!")
         }
  }

  const validLogin = ()=>{
      history('/login')
}  
const validateSubmit = (props)=>{

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'Hoda8DZJ6F59ZIPpR4pZz7Obd54Z4UBH2WRu3pqy'
  }
  
    axios.post('https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/user/signup', {
            email: Email,
            firstName: Firstname,
            lastName: Lastname,
            phoneNumber: Phonenumber,
            password: Password,
            
          },{
            headers: headers
          })
          .then(function (response) {
            console.log(response)
            console.log(response.data['username']);
            var UserName = response.data['username']
            history('/Confirm',{state:{EMAIL: Email, userName: UserName}});
            
          })
          .catch(function (error) {
            console.log(error);
            alert("User already registered")
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
                    Serverless B&B Registration
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">First Name</Typography>
              <TextField
                margin="normal"
                required
                id="email"
                label="First Name"
                name="email"
                onChange={validateFirstname}
                autoComplete="off"
              />
              <Typography variant="body2">Last Name</Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Last Name"
                name="email"
                onChange={validateLastname}                a
                utoComplete="off"
              />
              <Typography variant="body2">Phone Number</Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Phone Number"
                name="email"
                onChange={validatePhone}
                autoComplete="off"
              />
              <Typography variant="body2">Email</Typography>
              <TextField
                margin="normal"
                required
                
                id="email"
                label="Email"
                name="email"
                onChange={validateEmail}
                autoComplete="off"
              />
              <Typography variant="body2">{Emailmessage}</Typography>
              <Typography variant="body2">Password</Typography>
              <TextField
                margin="normal"
                required
                type={'password'}
                id="password"
                label="Password"
                name="password"
                onChange={validaPassword}
                autoComplete="off"
              />
              <Typography>{Passwordmessage}</Typography>
              <Typography variant="body2">Confirm Password</Typography>
              <TextField
                margin="normal"
                required
                type={'password'}
                id="password"
                label="Confirm Password"
                name="password"
                onChange={validateConfirm}
                autoComplete="off"
              />
              <Typography>{Confirmmessage}</Typography>
            </Box>
           
            <br />
            <br />
            <Box>
              <Button variant="contained" onClick={validateSubmit} color="primary" sx={{ height: 40 }}>
                Register
              </Button>
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={validLogin} sx={{ height: 40 }}>
                Login
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
        <div className="botSize"> {showChat ?  <iframe src="https://d2caie5x8agj5e.cloudfront.net/index.html" ></iframe> : null} </div>
        <div>
          {!showChat 
            ? <button className="btn" onClick={() => startChat()}>click to chat... </button> 
            : <button className="btn" onClick={() => hideChat()}>click to hide... </button>}
        </div>
      </div>   
      {/* <iframe src="https://d2caie5x8agj5e.cloudfront.net/index.html" style="width: 400px; height: 600px;"></iframe> */}
    </ThemeProvider>
  );
};

export default Registration;
