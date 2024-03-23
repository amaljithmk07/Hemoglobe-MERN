import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./UserbookingHistory.css";
import BASE_URI from "../constant/Constants";
import Loader from "../loader/Loader";

const UserbookingHistory = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [history, setHistory] = useState([]);

  ///Loading state
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);

    axios
      .get(`${BASE_URI}/api/user/booking-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setHistory(data.data.data);
          setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        if (err.response.status == 401) {
          setTimeout(() => {
            toast.error("Session Time out");
            sessionStorage.clear();
            navigate("/login");
          }, 3000);
        }
      });
  }, []);

  console.log(history);

  return (
    <div className="userbooking-hist-main-body">
      {load == true ? (
        <Loader load={load} />
      ) : (
        <>
          <div className="userbooking-hist-img-body">
            <img src="/carousal5.jpg" alt="" className="userbooking-hist-img" />
            <img src="/carousal1.jpg" alt="" className="userbooking-hist-img" />
          </div>
          <div className="userbooking-hist-sub-body">
            <div className="userbooking-hist-content">
              <div className="userbooking-hist-list-head">
                <div className="userbooking-hist-list-title">id</div>
                <div className="userbooking-hist-list-title">name</div>
                <div className="userbooking-hist-list-title">Booking date</div>
                <div className="userbooking-hist-list-title">Donation date</div>
                <div className="userbooking-hist-list-title">status</div>
              </div>
              <div className="userbooking-hist-list-body-sec">
                {history.length !== 0 ? (
                  <>
                    {history.map((data) => (
                      <div className="userbooking-hist-list-body">
                        <div className="userbooking-hist-list-data">
                          {data._id.slice(15)}
                        </div>
                        <div className="userbooking-hist-list-data">
                          {data.name}
                        </div>
                        <div className="userbooking-hist-list-data">
                          {data.booking_date}
                        </div>
                        <div className="userbooking-hist-list-data">
                          {data.donation_date}
                        </div>
                        <div className="userbooking-hist-list-data">
                          {data.status}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>Booking services are not available at the moment.</>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserbookingHistory;
