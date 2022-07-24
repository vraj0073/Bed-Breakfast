import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [upcomingBookings, setUpcomingBookings] = React.useState();
  const [pastBookings, setPastBookings] = React.useState();
  const history = useNavigate();
  const [tomDate, setTomDate] = React.useState();
  const [yesDate, setYesDate] = React.useState();

  React.useEffect(() => {

    if(!localStorage.getItem("token")) {
      history("/login");
    }

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    setTomDate(tomorrow);
    

     const yesterday = new Date(today)
     yesterday.setDate(yesterday.getDate() - 1)
    setYesDate(yesterday);

    console.log(today);
    console.log(tomorrow);
    // Upcoming bookings
    axios({
      method: "post",
      url: "https://4yj142u508.execute-api.us-east-1.amazonaws.com/dev/api/bookings/upcoming",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: localStorage.getItem('username') },
    }).then((res) => {
      console.log(res["data"]);
      setUpcomingBookings(res["data"]["upcoming_bookings"]);
      console.log(new Date(res["data"]["upcoming_bookings"][1]["BookingFrom"]))
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

      <Typography variant="h5">Upcoming / Current Bookings</Typography>
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
                  Booking ID : {booking.BookingId} &nbsp; | &nbsp; Total Rooms: {booking.TotalRooms}
                  &nbsp;|&nbsp; Dates : {booking.BookingFrom} -{" "}
                  {booking.BookingTo}
                </div>
              </div>

              <div className="div-10" style={{display: "flex", alignItem: "center", justifyContent: "center"}}>
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
                    width: "10%",
                  }}
                >
                  Cancel Booking
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  onClick={() => {
                    history("/tour");
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#0081a7",
                    marginTop: 10,
                    color: "white",
                    fontSize: "16px",
                    color: "white",
                    fontWeight: 700,
                    width: "10%",
                  }}
                >
                  Request Tour
                </Button>
                &nbsp;&nbsp;
                {(new Date(booking.BookingFrom) == new Date() || 
                (new Date(booking.BookingFrom) < new Date() && new Date(booking.BookingTo) >= new Date()))
                 && <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("bookingid",booking.BookingId)
                    history("/kitchenBooking");
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#0081a7",
                    marginTop: 10,
                    color: "white",
                    fontSize: "16px",
                    color: "white",
                    fontWeight: 700,
                    width: "10%",
                  }}
                >
                  Order Meal
                </Button>}
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
                      Rooms: {booking.TotalRooms} &nbsp;|&nbsp; Dates : {booking.BookingFrom} -{" "}
                      {booking.BookingTo}
                    </div>
                  </div>

                  <div className="div-10" style={{display: "flex", alignItem: "center", justifyContent: "center"}}>
                  <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("bookingid",booking.BookingId)
                    history("/feedback");
                  }}
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#0081a7",
                    marginTop: 10,
                    color: "white",
                    fontSize: "16px",
                    color: "white",
                    fontWeight: 700,
                    width: "20%",
                  }}
                >
                  Give Feedback
                </Button>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <div className="div-10" style={{display: "flex", alignItem: "center", justifyContent: "center"}}>
      <Button
        href="/rooms"
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style={{
          borderRadius: 5,
          backgroundColor: "black",
          marginTop: 50,
          color: "white",
          fontSize: "16px",
          color: "white",
          fontWeight: 700,
          width: "10%",
        }}
      >
        Home
      </Button>
      </div>
    </div>
  );
};

export default Bookings;
