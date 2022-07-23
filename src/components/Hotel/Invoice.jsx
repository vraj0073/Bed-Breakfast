import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomServiceSharpIcon from "@mui/icons-material/RoomServiceSharp";
import axios from "axios";

const theme = createTheme();
const Invoice = () => {
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/invoice/get",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: localStorage.getItem("username") },
    }).then((res) => {
      console.log(res["data"]);
      setInvoice(res["data"]["invoice"]);
    });
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
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
                      Serverless B&B Invoice
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box xs={12} sm={12} md={12}>
              <Box>
                <Typography variant="body2">Booking ID</Typography>
                <Typography variant="h4">{invoice.Id}</Typography>
              </Box>
              <br />
              <br />
              <Box>
                <Typography variant="body2">Date</Typography>
                <Typography variant="h4">
                  {invoice.Start_Date}&nbsp; to &nbsp;{invoice.End_Date}
                </Typography>
              </Box>
              <br />
              <br />
              <Box sx={{ order: 1 }}>
                <Typography variant="body2">Price</Typography>
                <Typography variant="h4">{invoice.Room_Price} $</Typography>
                <Typography variant="h6">Room</Typography>
                <br />
                <Typography variant="h4">{invoice.Kitchen_Price} $</Typography>
                <Typography variant="h6">Kitchen</Typography>
                {/* <div className="row ">
                  <div className="col lg-6 inline">Hello</div>
                  <div className="col lg-6 inline">World</div>
                </div> */}
              </Box>
              <br />
              <br />
              <Box sx={{ order: 2 }}>
                <Typography variant="body2">Total Amount</Typography>
                <Typography variant="h4">C$ {invoice.Total}</Typography>
              </Box>
              <br />
              <br />
              <Box>
                <Button
                  variant="contained"
                  href="rooms"
                  color="primary"
                  sx={{ height: 40 }}
                >
                  Back
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
    </div>
  );
};

export default Invoice;
