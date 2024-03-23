import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../constant/Constants";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmpassword] = useState(false);
  const [letters, setLetters] = useState({});
  const lettershandler = (e) => {
    const { name, value } = e.target;
    setLetters({ ...letters, [name]: value });
  };

  //Submit
  const submitHandler = (e) => {
    // SVGDefsElement
    axios
      .post(`${BASE_URI}/api/register`, letters)
      .then((data) => {
        console.log(data);
        toast.success('Register Success', {
          position: "bottom-center",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errormessage, {
          position: "bottom-center",
        });
      });
    e.preventDefault();
  };
  // console.log(letters);

  // Password Show
  const passShow = () => {
    setPassword((prev) => !prev);
  };

  //Confirm Password Show
  const confirmpassShow = () => {
    setConfirmpassword((prev) => !prev);
  };
  return (
    <div>
      <Toaster />
      <div className="register-body">
        <div className="register-card">
          <div className="register-head">Register</div>
          <form action="" className="register-card-form">
            <input
              type="text"
              className="register-input"
              name="name"
              onChange={lettershandler}
              placeholder="Name"
            />
            <input
              type="number"
              className="register-input"
              name="age"
              onChange={lettershandler}
              placeholder="age"
            />
            <input
              type="number"
              className="register-input"
              name="phone_number"
              onChange={lettershandler}
              placeholder="phone number"
            />
            <input
              type="text"
              className="register-input"
              name="email"
              onChange={lettershandler}
              placeholder="email"
            />
            {/* // Password */}

            <div className="register-input">
              {password == true ? (
                <img
                  src="open-eye-login.png"
                  alt=""
                  className="register-input-logo"
                  onClick={passShow}
                />
              ) : (
                <img
                  src="closed-eye-login.png"
                  alt=""
                  onClick={passShow}
                  className="register-input-logo"
                />
              )}
              <input
                type={password ? "text" : "password"}
                className="register-input-password"
                name="password"
                onChange={lettershandler}
                placeholder="Password"
              />
            </div>
            {/* //Confirm Password */}

            <div className="register-input">
              {confirmPassword == true ? (
                <img
                  src="open-eye-login.png"
                  alt=""
                  className="register-input-logo"
                  onClick={confirmpassShow}
                />
              ) : (
                <img
                  src="closed-eye-login.png"
                  alt=""
                  onClick={confirmpassShow}
                  className="register-input-logo"
                />
              )}
              <input
                type={confirmPassword ? "text" : "password"}
                className="register-input-password"
                name="confirm_password"
                onChange={lettershandler}
                placeholder="Confirm password"
              />
            </div>
            <div className="register-submit-sec">
              <button
                type="submit"
                onClick={submitHandler}
                className="register-submit-btn"
              >
                {" "}
                Register
              </button>
            </div>
          </form>
          <div className="register-link">
            Already have an account ?{" "}
            <Link to={"/login"} className="reg-link">
              Sign in{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
