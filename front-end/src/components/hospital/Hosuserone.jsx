import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Hosuserone.css";
import BASE_URI from "../constant/Constants";
import Loader from "../loader/Loader";
const Hosuserone = () => {
  const token = sessionStorage.getItem("Token");
  const navigate = useNavigate();
  const [date, setdate] = useState([]);
  const [userone, setUserone] = useState([]);

  const { id } = useParams();
  //view single one
  const [load, setLoad] = useState(false); //loading
  useEffect(() => {
    setLoad(true);

    axios
      .get(`${BASE_URI}/api/hospital/viewone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUserone(data.data.data);
        setLoad(false);

        console.log(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);

        if (err.response.status == 401) {
          setTimeout(() => {
            sessionStorage.clear();
            toast.error("Session Time out");
            navigate("/login");
          }, 3000);
        }
      });
  }, []);

  // Approve Request

  const requestApprove = (id) => {
    axios
      .get(`${BASE_URI}/api/hospital/approve-booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const filtered = userone.filter((data) => {
          if (data._id == id) {
            return (data.status = "booking_approved");
          }
          return data;
        });
        setUserone(filtered);
        console.log("userone", userone);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Cancel Request

  const requestCancel = (id) => {
    axios
      .get(`${BASE_URI}/api/hospital/cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const filtered = userone.filter((data) => {
          console.log(data);
          if (data._id == id) {
            return (data.status = "pending");
          }
          return data;
        });
        setUserone(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //date input

  const dateinput = (e) => {
    const { name, value } = e.target;
    setdate({ [name]: value });
  };

  // Donation Date Approval

  const dateApproval = (id) => {
    axios
      .put(`${BASE_URI}/api/hospital/approve-date/${id}`, date, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          navigate("/hospital/reservations");
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Donation Complete

  const donationComplete = (id) => {
    // console.log(id);
    axios
      .put(
        `${BASE_URI}/api/hospital/donation-complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(date.donation_date);
  return (
    <div className="hos-userone-main-body">
      <Toaster position="bottom-center" />
      {load == true ? (
        <>
          <Loader load={load} />
        </>
      ) : (
        <>
          <div className="hos-userone-sub-body">
            <div className="hos-userone-sub-body-heading">Details</div>
            {userone.map((data) => (
              <div className="hos-userone-sub-body-content" key={data._id}>
                <div className="hos-userone-sub-body-content-left">
                  <div className="h-u-s-c-image-sec">
                    <img
                      src={`/upload/${data.image}`}
                      alt=""
                      className="h-u-s-c-image"
                    />
                  </div>
                  <div className="h-u-s-c-name-sec">{data.name}</div>
                </div>
                <div className="hos-userone-sub-body-content-right">
                  <div className="h-u-s-c-right-data-sec">
                    Id : &nbsp;
                    {data._id}
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Gender : &nbsp; {data.gender}
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Blood Group : &nbsp;
                    <div
                      style={{
                        color: "rgb(173, 35, 35)",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: "none",
                      }}
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
                                              {data.blood_group ==
                                              "AB_positive" ? (
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
                      )}{" "}
                    </div>
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Date Of Birth : &nbsp;
                    {data.date_of_birth}
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Phone : &nbsp;
                    {data.phone_number}
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Address : &nbsp;
                    {data.address}
                  </div>
                  <div className="h-u-s-c-right-data-sec">
                    Status : &nbsp;
                    {data.status == "booking_approved" ? (
                      <>Booking Approved</>
                    ) : (
                      <>{data.status}</>
                    )}
                    {!data.donation_date ? (
                      <>
                        {data.status !== "booking_approved" ? (
                          <button onClick={() => requestApprove(data._id)}>
                            Approve
                          </button>
                        ) : (
                          <button onClick={() => requestCancel(data._id)}>
                            cancel
                          </button>
                        )}{" "}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {data.status == "booking_approved" ? (
                    <div className="h-u-s-c-right-data-sec">
                      Donation date: &nbsp;
                      {data.donation_date ? (
                        <>{data.donation_date}</>
                      ) : (
                        <input
                          type="date"
                          name="donation_date"
                          onChange={dateinput}
                        />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
            <div className="hos-userone-sub-body-content-button-sec">
              {userone.map((data) => (
                <>
                  {data.status == "booking_approved" &&
                  date.donation_date !== undefined ? (
                    <button
                      className="hos-userone-sub-body-content-button"
                      onClick={() => dateApproval(data._id)}
                    >
                      Provide
                    </button>
                  ) : (
                    <>
                      {data.status == "booking_approved" &&
                      data.donation_date ? (
                        <button
                          className="hos-userone-sub-body-content-button"
                          onClick={() => donationComplete(data._id)}
                        >
                          Approve Donation
                        </button>
                      ) : (
                        <>
                          <button
                            className="hos-userone-sub-body-content-button"
                            style={{ cursor: "not-allowed" }}
                          >
                            provide
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hosuserone;
