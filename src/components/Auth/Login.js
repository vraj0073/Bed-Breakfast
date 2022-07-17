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
  const [email, setEmail] = React.useState(0);
  const [password, setPassword] = React.useState(0);
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
                fullWidth
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
                fullWidth
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
              <Button variant="contained" color="primary" sx={{ height: 40 }}>
                Next
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

export default Login;
