import React, { useState } from "react";
import "./Login.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";
import Loader from "../loader/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState({});
  const [showpass, setshowpass] = useState(false);
  const lettershandler = (e) => {
    const { name, value } = e.target;
    setLetters({ ...letters, [name]: value });
  };


  //Loading State
  const [load, setLoad] = useState(false);

  ///Login Submit

  const submitHandler = (e) => {
    setLoad(true);
    axios
      .post(`${BASE_URI}/api/login/`, letters)
      .then((data) => {
        console.log(data);
        toast.success("Login Successful");
        setTimeout(() => {
          sessionStorage.setItem("role", data.data.userRole);
          sessionStorage.setItem("LoginId", data.data.userId);
          sessionStorage.setItem("Token", data.data.token);
          setLoad(false);
          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        toast.error(err.response.data.message);
      });
    e.preventDefault();
  };
  // console.log(letters);
  const showpassword = () => {
    setshowpass((prev) => !prev);
  };
  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="login-body">
        {load == true ? (
          <Loader load={load} />
        ) : (
          <div className="login-card">
            <div className="login-head">Login</div>
            <form action="" className="login-card-form">
              <div className="login-input-sec">
                <img src="/userlogin.png" alt="" className="login-input-logo" />
                <input
                  type="text"
                  className="login-input"
                  name="email"
                  onChange={lettershandler}
                  placeholder="email"
                />
              </div>
              <div className="login-input-sec">
                {showpass == true ? (
                  <img
                    src="/open-eye-login.png"
                    alt=""
                    className="login-input-logo"
                    onClick={showpassword}
                  />
                ) : (
                  <img
                    src="/closed-eye-login.png"
                    alt=""
                    className="login-input-logo"
                    onClick={showpassword}
                  />
                )}
                <input
                  type={showpass ? "text" : "password"}
                  className="login-input"
                  name="password"
                  onChange={lettershandler}
                  placeholder="password"
                />
              </div>
              <div className="login-submit-sec">
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="login-submit-btn"
                >
                  {" "}
                  login
                </button>
              </div>
              {/* <div className="login-with-google-sec">
              <img
                src="/login-with-google.png"
                alt=""
                className="login-with-google"
              />
              Sign in with Google
            </div> */}
            </form>
            <div className="login-link">
              Already have an account ?
              <Link to={"/register"} className="login-reg-link">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
