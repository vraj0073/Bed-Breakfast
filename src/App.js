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
import Tour from "./components/Hotel/Tour";

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
            <Route exact path="/tour" element={<Tour />} />
            {/* Change End */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
