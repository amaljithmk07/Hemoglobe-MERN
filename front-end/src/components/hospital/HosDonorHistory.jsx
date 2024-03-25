import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";
import "./HosDonorHistory.css";

const HosDonorHistory = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [results, setresults] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/hospital/donor-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setresults(data.data.data);
      })
      .catch((err) => {
        console.log(err);
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
    <>
      <div className="hosdonorhistory-main-body">
        <Toaster position="bottom-center" />
        <div className="hosdonorhistory-sub-body">
          <div className="hosdonorhistory-sub-body-heading">Donor history</div>
          {results.length != 0 ? (
            <div className="hosdonorhistory-sub-body-content">
              <div className="hosdonorhistory-content-titles-sec">
                <div className="hosdonorhistory-title"></div>
                <div className="hosdonorhistory-title">FULL NAME </div>
                <div className="hosdonorhistory-title">BLOOD GROUP</div>
                <div className="hosdonorhistory-title">GENDER</div>
                <div className="hosdonorhistory-title">DATE OF BIRTH</div>
                <div className="hosdonorhistory-title">PHONE</div>
                <div className="hosdonorhistory-title">ADDRESS</div>
                <div className="hosdonorhistory-title"></div>
              </div>

              {results.map((data) => (
                <div key={data._id} className="hosdonorhistory-content-list">
                  <div className="hosdonorhistory-data">
                    <img
                      // src={`/upload/${data.image}`}
                      src={`${data.image}`}
                      alt=""
                      className="hosdonorhistory-img"
                    />
                  </div>
                  <div className="hosdonorhistory-data">{data.name}</div>
                  <div
                    style={{
                      color: "rgb(173, 35, 35)",
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: "none",
                    }}
                    className="hosdonorhistory-data"
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
                  <div className="hosdonorhistory-data">{data.gender}</div>
                  <div className="hosdonorhistory-data">
                    {data.date_of_birth}
                  </div>
                  <div className="hosdonorhistory-data">
                    {data.phone_number}
                  </div>
                  <div className="hosdonorhistory-data">{data.address}</div>
                  <div className="hosdonorhistory-data">
                    <Link to={`/hospital/userone/${data._id}`}>
                      <img src="/eye.png" alt="" id="view" />
                    </Link>
                    <img src="/trash.png" alt="" id="delete" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default HosDonorHistory;
