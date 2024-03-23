import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";

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
      <div className="hosnewbookings-main-body">
        <Toaster position="bottom-center" />
        <div className="hosnewbookings-sub-body">
          <div className="hosnewbookings-sub-body-heading">Donor history </div>
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
                      src={`/upload/${data.image}`}
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
                  <div className="hosnewbookings-data">{data.phone_number}</div>
                  <div className="hosnewbookings-data">{data.address}</div>
                  <div className="hosnewbookings-data">
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
