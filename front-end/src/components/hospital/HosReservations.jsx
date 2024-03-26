import React, { useEffect, useState } from "react";
import "./HosReservations.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";
const HosReservations = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [results, setresults] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/hospital/booking-approved-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setresults(data.data.data);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 401) {
          setTimeout(() => {
            toast.error("Session Time out");
            sessionStorage.clear();
            navigate("/login");
          }, 3000);
        }
      });
  }, []);
  return (
    <div className="hosreservations-main-body">
      <Toaster position="bottom-center" />
      <div className="hosreservations-sub-body">
        <div className="hosreservations-sub-body-heading">Reservations</div>
        {results.length !== 0 ? (
          <div className="hosreservations-sub-body-content">
            <div className="hosreservations-content-titles-sec">
              <div className="hosreservations-title"></div>
              <div className="hosreservations-title">FULL NAME </div>
              <div className="hosreservations-title">BLOOD GROUP</div>
              <div className="hosreservations-title">GENDER</div>
              <div className="hosreservations-title">DONATION date</div>
              <div className="hosreservations-title">PHONE</div>
              <div className="hosreservations-title">UPDATE</div>
              {/* <div className="hosreservations-title"></div> */}
            </div>

            {results.map((data) => (
              <div key={data._id} className="hosreservations-content-list">
                <div className="hosreservations-data">
                  <img
                    // src={`/upload/${data.image}`}
                    src={`${data.image}`}

                    alt=""
                    className="hosreservations-img"
                  />
                </div>
                <div className="hosreservations-data">{data.name}</div>
                <div
                  style={{
                    color: "rgb(173, 35, 35)",
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: "none",
                  }}
                  className="hosreservations-data"
                >
                  {data.blood_group == "A_positive" ? (
                    <>A+ve</>
                  ) : (
                    <>
                      {data.blood_group == "A_negative" ? (
                        <>A-ve</>
                      ) : (
                        <>
                          {data.blood_group == "B_positive" ? (
                            <>B+ve</>
                          ) : (
                            <>
                              {data.blood_group == "B_negative" ? (
                                <>B-ve</>
                              ) : (
                                <>
                                  {data.blood_group == "O_positive" ? (
                                    <>O+ve</>
                                  ) : (
                                    <>
                                      {data.blood_group == "O_negative" ? (
                                        <>O-ve</>
                                      ) : (
                                        <>
                                          {data.blood_group == "AB_positive" ? (
                                            <>AB+ve</>
                                          ) : (
                                            <>
                                              {data.blood_group ==
                                              "AB_negative" ? (
                                                <>AB-ve</>
                                              ) : (
                                                <></>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="hosreservations-data">{data.gender}</div>
                <div className="hosreservations-data">
                  {data.donation_date}
                </div>
                <div className="hosreservations-data">{data.phone_number}</div>
                <div className="hosreservations-data">
                  <Link to={`/hospital/userone/${data._id}`}>
                    <img src="/eye.png" alt="" id="view" />
                  </Link>
                </div>
                {/* <div className="hosreservations-data">
                  <Link to={`/hospital/userone/${data._id}`}>
                    <img src="/eye.png" alt="" id="view" />
                  </Link>
                  <img src="/trash.png" alt="" id="delete" />
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <>
             <img
                      src="/error.png"
                      alt=""
                      className="hosnewbookings-error"
                    />
          </>
        )}
      </div>
    </div>
  );
};

export default HosReservations;
