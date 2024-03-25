import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./HosPlasmaCenter.css";
import BASE_URI from "../constant/Constants";
import "aos/dist/aos.css";
import AOS from "aos";
import Loader from "../loader/Loader";

const HosPlasmaCenter = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const [bloodbank, setBloodbank] = useState({});
  const [seperateblood, setSeperateblood] = useState([]);

  const [load, setLoad] = useState(false); //Loading state
  useEffect(() => {
    setLoad(true);
    axios
      .get(`${BASE_URI}/api/hospital/blood-bank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setLoad(false);

        setBloodbank(data.data.data);
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
    AOS.init();
  }, []);

  const ref = useRef(null);
  const [list, setList] = useState(false);

  //Displaying Blood donated users

  const bloodgroup = (blood) => {
    console.log(blood);
    setList(true);

    axios
      .get(`${BASE_URI}/api/hospital/blood-list/${blood}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setSeperateblood(data.data.data);
        console.log(data.data.data);
        ref.current?.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(seperateblood);
  return (
    <div>
      <Toaster position="bottom-center" />

      <div className="hosplasmacenter-body">
        {load == true ? (
          <Loader load={load} />
        ) : (
          <>
            <div className="hosplasmacenter-title-sec">Blood Units</div>
            <div className="hosplasmacenter-blood-sec">
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/A+ blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/sze71l3pd7jmosvnlhnc.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("A_positive")}
                />
                {bloodbank.A_positive * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/A- blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/clo2jj1tepzdpqhn7xfl.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("A_negative")}
                />
                {bloodbank.A_negative * 350}ml
              </div>

              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/B+ blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/juv0ulyoz6k7hbxawajk.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("B_positive")}
                />
                {bloodbank.B_positive * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/B- blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/rvuuiixfczrvuwtmk82l.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("B_negative")}
                />
                {bloodbank.B_negative * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/O+ blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/hpbohzn1dnqc2e9lmrlv.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("O_positive")}
                />
                {bloodbank.O_positive * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/O- blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/sofcb6sqoartopygku5e.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("O_negative")}
                />
                {bloodbank.O_negative * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/AB+ blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/tp4piqulmvmquanmqy4j.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("AB_positive")}
                />
                {bloodbank.AB_positive * 350}ml
              </div>
              <div className="hosplasmacenter-blood">
                {" "}
                <img
                  // src="/AB- blood.png"
                  src="https://res.cloudinary.com/dqc2xhnac/image/upload/v1711290950/Hemoglobe/pprjchqirssbryow02ue.png"
                  alt=""
                  className="hosplasmacenter-blood-img"
                  onClick={() => bloodgroup("AB_negative")}
                />
                {bloodbank.AB_negative * 350}ml
              </div>
            </div>
          </>
        )}
      </div>
      {list == true ? (
        <div className="hosplasmacenter-user-list-body" data-aos="fade-down">
          <div className="hosplasmacenter-user-list-sub-body" ref={ref}>
            {seperateblood.map((data) => (
              <div
                className="hosplasmacenter-user-list-content-sec"
                key={data._id}
              >
                <div className="hosreservations-data">{data.name}</div>
                <div className="hosreservations-data">{data.gender}</div>
                <div className="hosreservations-data">{data.donation_date}</div>
                <div className="hosreservations-data">{data.phone_number}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HosPlasmaCenter;
