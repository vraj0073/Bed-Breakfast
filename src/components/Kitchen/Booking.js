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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledEngine from "@mui/styled-engine";
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
    const [Menu,SetMenu]= useState()
    const [Quantity,SetQuantity] = useState();
    const [Time,SetTime] = useState();

    const validPancake = (e) =>{
        // const pancakes = e.target.value;
        const { myValue } = e.currentTarget.dataset;
    console.log(myValue)
    SetMenu(myValue)
        
    }
    
    const validOatmeal = (e) =>{
        const { myValue } = e.currentTarget.dataset;
    console.log(myValue)
    SetMenu(myValue)
    }
    const validSandwich = (e) =>{
        const { myValue } = e.currentTarget.dataset;
        console.log(myValue)
        SetMenu(myValue)
    }
    const validBread = (e) =>{
        const { myValue } = e.currentTarget.dataset;
    console.log(myValue)
    SetMenu(myValue)
    }
    const validCoffee = (e) =>{
        const { myValue } = e.currentTarget.dataset;
    console.log(myValue)
    SetMenu(myValue)
    }

    const handleChange = (e) =>{
        const qu = e.target.value
        console.log(qu)
        SetQuantity(qu)
    }
    const handleTime = (e) =>{
        const time = e.target.value
        console.log(time)
        SetTime(time)
    }

    const validateOrder = ()=>{
        axios.post('https://mpd7tsd5bd.execute-api.us-east-1.amazonaws.com/dev/api/kitchen', {
            item: Menu,
            qty: Quantity,
            day: Time
            
          })
          .then(function (response) {
            console.log(response);
            const message = response.data['message']
            alert(message)
            
            
               
          })
          .catch(function (error) {
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
                    Serverless B&B Menu
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="body2">Iteams Available</Typography>
              <br></br>
              <Typography variant="body2">pancakes - $10</Typography>
              <Typography variant="body2">oatmeal - $4</Typography>
              <Typography variant="body2">sandwich - $7</Typography>
              <Typography variant="body2">coffee - $3</Typography>
              <Typography variant="body2">bread-butter - $5</Typography>
              
              
            </Box>
            <br />
            <br />
            <Box>
            <div>
            <div style={{paddingLeft: "35%"}}>      
        <MenuItem data-my-value={'pancakes'} onClick={validPancake} > 
        pancakes
        </MenuItem>
        <MenuItem data-my-value={'oatmeal'} onClick={validOatmeal} >
          oatmeal
        </MenuItem>
        <MenuItem data-my-value={'sandwich'} onClick={validSandwich} >
          sandwich
        </MenuItem>
        <MenuItem data-my-value={'bread-butter'} onClick={validBread} >
        bread-butter
        </MenuItem>
        <MenuItem data-my-value={'coffee'} onClick={validCoffee}>
          coffee
        </MenuItem>
      
    </div>
    </div>
    <div>
    <Typography variant="body2">Quantity</Typography>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={handleChange}
    label="Quantity"  
  >

    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
  </Select>
    </div>
    <div>
    <Typography variant="body2">Scedule Time:</Typography>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={handleTime}
    label="Quantity"  
  >

    <MenuItem value={'today'}>Today</MenuItem>
    <MenuItem value={'tomorrow'}>Tomorrow</MenuItem>

  </Select>
    </div>
     </Box>
            <br />
            <br />
            <Box>
              <Button variant="contained" color="primary" onClick={validateOrder} sx={{ height: 40 }}>
               Order
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

export default Booking;
