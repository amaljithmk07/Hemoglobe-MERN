import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const role = sessionStorage.getItem("role");
  console.log("Token :", token);
  console.log("Role :", role);

  const [togglemenu, setTogglemenu] = useState(false);

  //////Hamburger Menu

  const hamburgerMenu = () => {
    setTogglemenu((prev) => !prev);
  };

  //Tpggle bar off

  const togglebarOff = () => {
    setTogglemenu(false);
  };

  ///Logout

  const Logout = () => {
    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
    setTogglemenu(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        {" "}
        HEMOGLOBE <img src="/logo.png" alt="" className="nav-logo-img" />
      </div>
      {/* ///////////----Hamburger Menu Section */}

      <div className="hamburger-sec">
        {togglemenu !== true ? (
          <img
            src="/hamburger.png"
            alt=""
            className="hamburger-icon"
            onClick={hamburgerMenu}
          />
        ) : (
          <img
            src="/hamburger1.png"
            alt=""
            className="hamburger-icon"
            onClick={hamburgerMenu}
          />
        )}
      </div>
      {togglemenu == true ? (
        <>
          <ul className="hamb-nav-list">
            <li>
              {" "}
              <Link
                to={"/home"}
                className="hamb-nav-link"
                onClick={togglebarOff}
              >
                home
              </Link>
            </li>
            {role == null && token == null ? (
              <>
                {" "}
                <li>
                  <Link
                    to={"/login"}
                    className="hamb-nav-link"
                    onClick={togglebarOff}
                  >
                    login{" "}
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to={"/register"}
                    className="hamb-nav-link"
                    onClick={togglebarOff}
                  >
                    register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* //user  */}

                {role == 2 && token !== null ? (
                  <>
                    <li>
                      <Link
                        to={"/user/donate"}
                        className="hamb-nav-link"
                        onClick={togglebarOff}
                      >
                        Booking Page{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/user/date-accept"}
                        className="hamb-nav-link"
                        onClick={togglebarOff}
                      >
                        Accept Message{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/user/booking-history"}
                        className="hamb-nav-link"
                        onClick={togglebarOff}
                      >
                        Booking History{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/user/certificate"}
                        className="hamb-nav-link"
                        onClick={togglebarOff}
                      >
                        Certificate{" "}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* //Hospital  */}

                    {role == 3 && token !== null ? (
                      <>
                        <li>
                          <Link
                            to={"/hospital/new-bookings"}
                            className="hamb-nav-link"
                            onClick={togglebarOff}
                          >
                            New Bookings{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/hospital/reservations"}
                            className="hamb-nav-link"
                            onClick={togglebarOff}
                          >
                            Reservations{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/hospital/donor-history"}
                            className="hamb-nav-link"
                            onClick={togglebarOff}
                          >
                            Donor history{" "}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={"/hospital/plasma-center"}
                            className="hamb-nav-link"
                            onClick={togglebarOff}
                          >
                            {/* Blood bank */}
                            Plasma center
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        {/* //Admin  */}

                        {role == 1 && token !== null ? (
                          <li>
                            <Link
                              to={"/user"}
                              className="hamb-nav-link"
                              onClick={togglebarOff}
                            >
                              Admin
                            </Link>
                          </li>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}

                <li>
                  <Link className="hamb-nav-link" onClick={Logout}>
                    logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
      ) : (
        <></>
      )}

      {/* //////------Default Navbar */}
      <div className="nav-section">
        <div className="nav-list">
          <ul className="nav-list">
            <li>
              {" "}
              <Link to={"/home"} className="nav-link">
                HOME
              </Link>
              <div className="underline"></div>
            </li>
            {role == null && token == null ? (
              <>
                {" "}
                <li>
                  <Link to={"/login"} className="nav-link">
                    LOGIN{" "}
                  </Link>
                  <div className="underline"></div>
                </li>{" "}
                <li>
                  <Link to={"/register"} className="nav-link">
                    REGISTER{" "}
                  </Link>
                  <div className="underline"></div>
                </li>
              </>
            ) : (
              <>
                {/* //user  */}

                {role == 2 && token !== null ? (
                  <>
                    <li>
                      <Link to={"/user/donate"} className="nav-link">
                        Booking Page{" "}
                      </Link>
                      <div className="underline"></div>
                    </li>
                    <li>
                      <Link to={"/user/date-accept"} className="nav-link">
                        Accept Message{" "}
                      </Link>
                      <div className="underline"></div>
                    </li>
                    <li>
                      <Link to={"/user/booking-history"} className="nav-link">
                        Booking History{" "}
                      </Link>
                      <div className="underline"></div>
                    </li>
                    <li>
                      <Link
                        to={"/user/certificate"}
                        className="nav-link"
                      >
                        Certificate{" "}
                      </Link>
                      <div className="underline"></div>
                    </li>
                  </>
                ) : (
                  <>
                    {/* //Hospital  */}

                    {role == 3 && token !== null ? (
                      <>
                        <li>
                          <Link
                            to={"/hospital/new-bookings"}
                            className="nav-link"
                          >
                            New Bookings{" "}
                          </Link>
                          <div className="underline"></div>
                        </li>
                        <li>
                          <Link
                            to={"/hospital/reservations"}
                            className="nav-link"
                          >
                            Reservations{" "}
                          </Link>
                          <div className="underline"></div>
                        </li>
                        <li>
                          <Link
                            to={"/hospital/donor-history"}
                            className="nav-link"
                          >
                            Donor history{" "}
                          </Link>
                          <div className="underline"></div>
                        </li>

                        <li>
                          <Link
                            to={"/hospital/plasma-center"}
                            className="nav-link"
                          >
                            {/* Blood bank */}
                            Plasma center
                          </Link>
                          <div className="underline"></div>
                        </li>
                      </>
                    ) : (
                      <>
                        {/* //Admin  */}

                        {role == 1 && token !== null ? (
                          <li>
                            <Link to={"/user"} className="nav-link">
                              Admin
                            </Link>
                            <div className="underline"></div>
                          </li>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}

                <li>
                  <Link className="nav-link" onClick={Logout}>
                    LOGOUT
                  </Link>
                  <div className="underline"></div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
