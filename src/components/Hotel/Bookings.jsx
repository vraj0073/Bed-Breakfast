import * as React from "react";
import Avatar from "@mui/material/Avatar";
// import { Container } from "@mui/material";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IconButton } from "@mui/material";

import { styled } from "@mui/material/styles";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// const get_upcoming_bookings(() => {

// })

const Bookings = () => {
  const [upcomingBookings, setUpcomingBookings] = React.useState();
  const [pastBookings, setPastBookings] = React.useState();

  React.useEffect(() => {
    // Upcoming bookings
    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/bookings/upcoming",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: "user1" },
    }).then((res) => {
      console.log(res["data"]);
      setUpcomingBookings(res["data"]["upcoming_bookings"]);
    });

    // Past bookings
    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/bookings/past",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: localStorage.getItem("username") },
    }).then((res) => {
      setPastBookings(res["data"]["past_bookings"]);
    });
  }, []);

  function get_booking_details() {
    // Upcoming bookings
    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/bookings/upcoming",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: localStorage.getItem("username") },
    }).then((res) => {
      console.log(res["data"]);
      setUpcomingBookings(res["data"]["upcoming_bookings"]);
    });
  }

  return (
    <div className="Bookings">
      <Container>
        <Typography variant="h4">Serverless B&B</Typography>
      </Container>
      <hr />

      <Typography variant="h5">Upcoming Bookings</Typography>
      <br />
      {upcomingBookings?.map((booking) => (
        <div className="CartTotal">
          <div className="cart-total-bg">
            <div className="container cart-total-container res-p">
              <div className="row">
                <div className="col-lg-12 history-title div-10">
                  <Typography variant="h6">
                    Booking ID : {booking.BookingId}{" "}
                  </Typography>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 history-title div-10">
                  Booking ID : {booking.BookingId} &nbsp; | &nbsp; Total Rooms:{" "}
                  &nbsp;|&nbsp; Dates : {booking.BookingFrom} -{" "}
                  {booking.BookingTo}
                  {/* {booking.TotalRooms} */}
                </div>
              </div>

              <div className="div-10">
                <Button
                  variant="contained"
                  onClick={() => {
                    const id = booking.BookingId;

                    let remove_item = {};
                    remove_item["BookingId"] = id;
                    remove_item["Rooms"] = booking.Rooms;
                    remove_item["BookingFrom"] = booking.BookingFrom;
                    remove_item["BookingTo"] = booking.BookingTo;

                    const res = axios
                      .post(
                        "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/rooms/cancel",
                        remove_item
                      )
                      .then((result) => {
                        alert("Booking has been cancelled.");
                        get_booking_details();
                      });
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#0081a7",
                    marginTop: 10,
                    color: "white",
                    fontSize: "16px",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
              <br />
            </div>
          </div>
        </div>
      ))}
      <hr />
      <Container>
        <div className="PastBookings">
          <Typography variant="h5">Past Bookings</Typography>
          <br />
          {pastBookings?.map((booking) => (
            <div className="CartTotal">
              <div className="cart-total-bg">
                <div className="container cart-total-container res-p">
                  <div className="row">
                    <div className="col-lg-12 history-title div-10">
                      <Typography variant="h6">
                        Booking ID : {booking.BookingId}{" "}
                      </Typography>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 history-title div-10">
                      Booking ID : {booking.BookingId} &nbsp; | &nbsp; Total
                      Rooms: &nbsp;|&nbsp; Dates : {booking.BookingFrom} -{" "}
                      {booking.BookingTo}
                      {/* {booking.TotalRooms} */}
                    </div>
                  </div>

                  <div className="div-10"></div>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Button
        href="/rooms"
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Back
      </Button>
    </div>
  );
};

export default Bookings;
