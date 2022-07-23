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
      data: { userId: "user1" },
    }).then((res) => {
      setPastBookings(res["data"]);
    });
  }, []);

  return (
    <div className="Bookings">
      <Container>Serverless B&B</Container>
      <Container>
        <div className="UpcomingBookings">
          <Grid container>
            {upcomingBookings?.map((booking) => (
              <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      <Container>
        <div className="PastBookings"></div>
      </Container>
    </div>
  );
};

export default Bookings;
