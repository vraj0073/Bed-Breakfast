import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Hotel from "./components/Hotel/Hotel";
import BookRoom from "./components/Hotel/BookRoom";
import Bookings from "./components/Hotel/Bookings";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import AuthenticationCode from "./components/Auth/AuthenticationCode";
import SecurityQuestion from "./components/Auth/SecurityQuestion";
import SucessPage from "./components/Auth/SucessPage";
import SecurityAnswer from "./components/Auth/SecurityAnswer";
import Cipher from "./components/Auth/Cipher";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ForgetPasswordCode from "./components/Auth/ForgetPasswordCode";

function App() {
  return (
    <div className="App">
      <div className="Header">{/* <Navbar /> */}</div>
      <div className="Content">
        <Router>
          <Routes>
            <Route exact path="/rooms" element={<Hotel />} />
            <Route exact path="/book" element={<BookRoom />} />
            <Route exact path="/bookings" element={<Bookings />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Registration />} />
            <Route exact path="/Confirm" element={<AuthenticationCode />} />
            <Route exact path="/Security" element={<SecurityQuestion />} />
            <Route exact path="/Sucess" element={<SucessPage />} />
            <Route exact path="/SecurityAnswer" element={<SecurityAnswer />} />
            <Route exact path="/Cipher" element={<Cipher />} />
            <Route exact path="/forgetpassword" element={<ForgetPassword />} />
            <Route exact path="/forgetcode" element={<ForgetPasswordCode />} />
            {/* Change End */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
