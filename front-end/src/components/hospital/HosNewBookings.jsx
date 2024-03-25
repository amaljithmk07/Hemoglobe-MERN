import React, { useEffect, useState } from "react";
import "./HosNewBookings.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";
import Loader from "../loader/Loader";
const HosNewBookings = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [results, setresults] = useState([]);

  const [load, setLoad] = useState(false); //loading
  useEffect(() => {
    setLoad(true);
    axios
      .get(`${BASE_URI}/api/hospital/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setLoad(false);

        console.log(data.data.data);
        setresults(data.data.data);
      })
      .catch((err) => {
        setLoad(false);

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

  //
  function deleteHandler(id) {
    var confirmation = window.confirm("Want to delete?");
    if (confirmation) {
      axios
        .get(`${BASE_URI}/api/hospital/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          console.log(data.data.data);
          // setresults(data.data.data);
        })
        .catch((err) => {
          setLoad(false);

          console.log(err.response.status);
          if (err.response.status == 401) {
            setTimeout(() => {
              toast.error("Session Time out");
              sessionStorage.clear();
              navigate("/login");
            }, 3000);
          }
        });
    }
  }

  return (
    <div className="hosnewbookings-main-body">
      <Toaster position="bottom-center" />
      {load == true ? (
        <>
          <Loader load={load} />
        </>
      ) : (
        <>
          <div className="hosnewbookings-sub-body">
            <div className="hosnewbookings-sub-body-heading">
              New Booking List
            </div>
            {results.length != 0 ? (
              <div className="hosnewbookings-sub-body-content">
                <div className="hosnewbookings-content-titles-sec">
                  <div className="hosnewbookings-title"></div>
                  <div className="hosnewbookings-title">FULL NAME </div>
                  <div className="hosnewbookings-title">BLOOD GROUP</div>
                  <div className="hosnewbookings-title">GENDER</div>
                  <div className="hosnewbookings-title">DATE OF BIRTH</div>
                  <div className="hosnewbookings-title">PHONE</div>
                  <div className="hosnewbookings-title">ADDRESS</div>
                  <div className="hosnewbookings-title"></div>
                </div>

                {results.map((data) => (
                  <div key={data._id} className="hosnewbookings-content-list">
                    <div className="hosnewbookings-data">
                      <img
                        // src={`/upload/${data.image}`}
                        src={`${data.image}`}
                        alt=""
                        className="hosnewbookings-img"
                      />
                    </div>
                    <div className="hosnewbookings-data">{data.name}</div>
                    <div
                      style={{
                        color: "rgb(173, 35, 35)",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: "none",
                      }}
                      className="hosnewbookings-data"
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
                    <div className="hosnewbookings-data">{data.gender}</div>
                    <div className="hosnewbookings-data">
                      {data.date_of_birth}
                    </div>
                    <div className="hosnewbookings-data">
                      {data.phone_number}
                    </div>
                    <div className="hosnewbookings-data">{data.address}</div>
                    <div className="hosnewbookings-data">
                      <Link to={`/hospital/userone/${data._id}`}>
                        <img
                          // src="/eye.png"
                          src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711340270/Hemoglobe/jgtmrjqrmfcqwtp1lo9h.png"
                          alt=""
                          id="view"
                        />
                      </Link>
                      <img
                        // src="/trash.png"
                        src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711340272/Hemoglobe/qcm8vzrpxclzgdu2lhlb.png"
                        alt=""
                        id="delete"
                        onClick={() => deleteHandler(data._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HosNewBookings;
