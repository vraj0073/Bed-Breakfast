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
import Tour1 from "./components/Hotel/Tour1";
import Tour2 from "./components/Hotel/Tour2";
import Tour3 from "./components/Hotel/Tour3";
import Tour4 from "./components/Hotel/Tour4";
import Tour5 from "./components/Hotel/Tour5";




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
            <Route exact path="/tour1" element={<Tour1 />} />
            <Route exact path="/tour2" element={<Tour2 />} />
            <Route exact path="/tour3" element={<Tour3 />} />
            <Route exact path="/tour4" element={<Tour4 />} />
            <Route exact path="/tour5" element={<Tour5 />} />
            {/* Change End */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
