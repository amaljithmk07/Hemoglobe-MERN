import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userdonate from "./components/user/Userdonate";
import Userhome from "./components/user/Userhome";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Hosuserone from "./components/hospital/Hosuserone";
import UserdateAccept from "./components/user/UserdateAccepted";
import UserbookingHistory from "./components/user/UserbookingHistory";
import Usercertificate from "./components/user/Usercertificate";
import HosNewBookings from "./components/hospital/HosNewBookings";
import HosReservations from "./components/hospital/HosReservations";
import HosPlasmaCenter from "./components/hospital/HosPlasmaCenter";
import HosDonorHistory from "./components/hospital/HosDonorHistory";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Userhome />} />

          {/* /////----USER ROUTES */}

          <Route path="/home" element={<Userhome />} />
          <Route path="/user/donate" element={<Userdonate />} />
          <Route path="/user/date-accept" element={<UserdateAccept />} />
          <Route
            path="/user/booking-history"
            element={<UserbookingHistory />}
          />
          <Route path="/user/certificate" element={<Usercertificate />} />

          {/* /////----HOSPITAL ROUTES */}

          <Route path="/hospital/reservations" element={<HosReservations />} />
          <Route path="/hospital/plasma-center" element={<HosPlasmaCenter />} />
          <Route path="/hospital/new-bookings" element={<HosNewBookings />} />
          <Route path="/hospital/userone/:id" element={<Hosuserone />} />
          <Route path="/hospital/donor-history" element={<HosDonorHistory />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
